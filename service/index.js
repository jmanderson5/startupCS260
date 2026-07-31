const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();

const authCookieName = 'token';

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

// The router already supplies "/api", so this route is only "/test".
apiRouter.get('/test', (req, res) => {
  res.send({
    message: 'Internship Command Center service is running',
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
