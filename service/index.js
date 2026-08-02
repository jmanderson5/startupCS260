const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const crypto = require('crypto');
const multer = require('multer');
const { google } = require('googleapis');
const database = require('./database.js');

const authCookieName = 'token';

// Google tokens indexed by the app user's email.
const googleTokens = new Map();

// Temporary OAuth states used to associate the callback
// with the correct Internship Command Center user.
const googleOAuthStates = new Map();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// The router already supplies "/api", so this route is only "/test".
apiRouter.get('/test', (req, res) => {
  res.send({
    message: 'Internship Command Center service is running',
  });
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await database.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({
        email: user.email,
      });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res, next) => {
  try {
    const token =
      req.cookies[authCookieName];

    if (token) {
      await database.clearUserToken(token);
    }

    res.clearCookie(authCookieName);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await database.getUserByToken(req.cookies[authCookieName]);
  if (user) {
    req.user = user
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Get applicatiion information
apiRouter.get('/profile/applications', verifyAuth, async (req, res, next) => {
    try {
      const applications =
        await database.getApplications(
          req.user.email
        );

      const response = applications.map(
        (application) => ({
          ...application,
          id: application._id.toString(),
        })
      );

      res.send(response);
    } catch (error) {
      next(error);
    }
  }
);

apiRouter.post(
  '/profile/applications',
  verifyAuth,
  async (req, res, next) => {
    try {
      const {
        company,
        position,
        status,
        dateApplied,
        notes,
      } = req.body;

      if (!company || !position) {
        return res.status(400).send({
          msg: 'Company and position are required',
        });
      }

      const application = {
        owner: req.user.email,
        company,
        position,
        status: status || 'Saved',
        dateApplied: dateApplied || null,
        notes: notes || '',
        createdAt: new Date(),
      };

      const savedApplication =
        await database.addApplication(
          application
        );

      res.status(201).send(savedApplication);
    } catch (error) {
      next(error);
    }
  }
);

const upload = multer({
  storage: multer.diskStorage({
    destination: 'public/',
    filename: (req, file, cb) => {
      const filetype = file.originalname.split('.').pop();
      const id = Math.round(Math.random() * 1e9);
      const filename = `${id}.${filetype}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 64000 },
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send({
      message: 'Uploaded succeeded',
      file: req.file.filename,
    });
  } else {
    res.status(400).send({ message: 'Upload failed' });
  }
});

const googleCalendarScopes = [
  'https://www.googleapis.com/auth/calendar.calendars.readonly',
  'https://www.googleapis.com/auth/calendar.events.readonly',
];

apiRouter.get(
  '/calendar/oauth/start',
  verifyAuth,
  (req, res) => {
    const oauthClient = createGoogleOAuthClient();

    const state = crypto.randomUUID();

    googleOAuthStates.set(state, {
      email: req.user.email,
      createdAt: Date.now(),
    });

    const authorizationUrl =
      oauthClient.generateAuthUrl({
        access_type: 'offline',
        scope: googleCalendarScopes,
        state,
        prompt: 'consent',
        include_granted_scopes: true,
      });

    res.redirect(authorizationUrl);
  }
);

apiRouter.get(
  '/calendar/oauth/callback',
  async (req, res) => {
    const { code, state, error } = req.query;

    const appOrigin =
      process.env.APP_ORIGIN ||
      'http://localhost:5173';

    if (error) {
      console.error(
        'Google OAuth authorization error:',
        error
      );

      return res.redirect(
        `${appOrigin}/profile?calendarError=${encodeURIComponent(
          error
        )}`
      );
    }

    if (!code || !state) {
      return res.status(400).send({
        msg: 'Missing Google OAuth code or state',
      });
    }

    const stateRecord =
      googleOAuthStates.get(state);

    googleOAuthStates.delete(state);

    if (!stateRecord) {
      return res.status(400).send({
        msg: 'Invalid or expired OAuth state',
      });
    }

    // Reject states older than 10 minutes.
    if (
      Date.now() - stateRecord.createdAt >
      10 * 60 * 1000
    ) {
      return res.status(400).send({
        msg: 'OAuth request expired',
      });
    }

    try {
      const oauthClient =
        createGoogleOAuthClient();

      const { tokens } =
        await oauthClient.getToken(code);

      googleTokens.set(
        stateRecord.email,
        tokens
      );

      res.redirect(
        `${appOrigin}/profile?calendarConnected=true`
      );
    } catch (oauthError) {
      console.error(
        'Google token exchange failed:',
        oauthError
      );

      res.redirect(
        `${appOrigin}/profile?calendarError=token_exchange_failed`
      );
    }
  }
);

apiRouter.get(
  '/calendar/status',
  verifyAuth,
  (req, res) => {
    res.send({
      connected: googleTokens.has(
        req.user.email
      ),
    });
  }
);

apiRouter.get(
  '/calendar/events',
  verifyAuth,
  async (req, res) => {
    const tokens = googleTokens.get(
      req.user.email
    );

    if (!tokens) {
      return res.status(401).send({
        msg: 'Google Calendar is not connected',
        needsGoogleAuthorization: true,
      });
    }

    try {
      const oauthClient =
        createGoogleOAuthClient();

      oauthClient.setCredentials(tokens);

      // Preserve refreshed tokens, if Google issues them.
      oauthClient.on('tokens', (newTokens) => {
        googleTokens.set(req.user.email, {
          ...tokens,
          ...newTokens,
        });
      });

      const calendarApi = google.calendar({
        version: 'v3',
        auth: oauthClient,
      });

      const result =
        await calendarApi.events.list({
          calendarId: 'primary',
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: 'startTime',
        });

      const events = (
        result.data.items || []
      ).map((event) => ({
        id: event.id,
        title:
          event.summary || 'Untitled event',
        description:
          event.description || '',
        location: event.location || '',
        start:
          event.start?.dateTime ||
          event.start?.date,
        end:
          event.end?.dateTime ||
          event.end?.date,
        link: event.htmlLink || '',
      }));

      res.send(events);
    } catch (calendarError) {
      console.error(
        'Google Calendar API error:',
        calendarError
      );

      res.status(502).send({
        msg: 'Unable to retrieve Google Calendar events',
      });
    }
  }
);

apiRouter.delete(
  '/profile/applications/:id',
  verifyAuth,
  async (req, res, next) => {
    try {
      const result =
        await database.deleteApplication(
          req.user.email,
          req.params.id
        );

      if (result.deletedCount === 0) {
        return res.status(404).send({
          msg: 'Application not found',
        });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

async function findUser(field, value) {
  if (!value) {
    return null;
  }

  if (field === 'email') {
    return database.getUser(value);
  }

  if (field === 'token') {
    return database.getUserByToken(value);
  }

  return null;
}

async function createUser(email, password) {
  const passwordHash =
    await bcrypt.hash(password, 10);

  const user = {
    email,
    password: passwordHash,
    token: uuid.v4(),
  };

  await database.addUser(user);

  return user;
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

function createGoogleOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
}

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(413).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message });
  }
});

async function startServer() {
  try {
    await database.connectToDatabase();

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error(
      'Unable to start service:',
      error
    );

    process.exit(1);
  }
}

startServer();
