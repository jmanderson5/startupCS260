const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url =
  `mongodb+srv://${encodeURIComponent(config.userName)}` +
  `:${encodeURIComponent(config.password)}` +
  `@${config.hostname}`;

const client = new MongoClient(url);
const database = client.db('internshipCommandCenter');

const userCollection = database.collection('users');
const applicationCollection = database.collection('applications');

const messageCollection = database.collection('messages');

async function connectToDatabase() {
  await client.connect();
  await database.command({ ping: 1 });
  console.log('Connected to MongoDB');
}

// Message operations

async function addMessage(message) {
  const result = await messageCollection.insertOne(
    message
  );

  return {
    ...message,
    id: result.insertedId.toString(),
  };
}

async function getMessages() {
  const messages = await messageCollection
    .find({})
    .sort({ sentAt: 1 })
    .limit(100)
    .toArray();

  return messages.map((message) => ({
    ...message,
    id: message._id.toString(),
  }));
}

async function getProfiles() {
  return userCollection
    .find(
      {},
      {
        projection: {
          _id: 0,
          email: 1,
          name: 1,
          headline: 1,
        },
      }
    )
    .sort({ name: 1, email: 1 })
    .toArray();
}

async function updateProfile(email, profile) {
  await userCollection.updateOne(
    { email },
    {
      $set: {
        name: profile.name,
        headline: profile.headline,
        updatedAt: new Date(),
      },
    }
  );

  return userCollection.findOne(
    { email },
    {
      projection: {
        _id: 0,
        email: 1,
        name: 1,
        headline: 1,
      },
    }
  );
}

// User operations

function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  if (!token) {
    return null;
  }

  return userCollection.findOne({ token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
  return user;
}

async function updateUser(user) {
  await userCollection.updateOne(
    { email: user.email },
    { $set: user }
  );

  return user;
}

async function clearUserToken(token) {
  await userCollection.updateOne(
    { token },
    { $unset: { token: '' } }
  );
}

// Application operations

function getApplications(owner) {
  return applicationCollection
    .find({ owner })
    .sort({ createdAt: -1 })
    .toArray();
}

async function addApplication(application) {
  const result =
    await applicationCollection.insertOne(application);

  return {
    ...application,
    id: result.insertedId.toString(),
  };
}

async function deleteApplication(owner, applicationId) {
  return applicationCollection.deleteOne({
    _id: new ObjectId(applicationId),
    owner,
  });
}

module.exports = {
  connectToDatabase,
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  clearUserToken,
  getApplications,
  addApplication,
  deleteApplication,
};