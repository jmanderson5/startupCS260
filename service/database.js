const {
  MongoClient,
  ObjectId,
} = require('mongodb');

const config = require('./dbConfig.json');

const connectionString =
  `mongodb+srv://${encodeURIComponent(config.userName)}` +
  `:${encodeURIComponent(config.password)}` +
  `@${config.hostname}`;

const client = new MongoClient(connectionString);

const database = client.db('internshipCommandCenter');
const userCollection = database.collection('users');
const applicationCollection =
  database.collection('applications');

async function connectToDatabase() {
  await client.connect();
  await database.command({ ping: 1 });

  console.log('Connected to MongoDB');
}

// User functions

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

async function updateUserToken(email, token) {
  await userCollection.updateOne(
    { email },
    {
      $set: { token },
    }
  );
}

async function clearUserToken(token) {
  await userCollection.updateOne(
    { token },
    {
      $unset: { token: '' },
    }
  );
}

// Application functions

function getApplications(owner) {
  return applicationCollection
    .find({ owner })
    .sort({ createdAt: -1 })
    .toArray();
}

async function addApplication(application) {
  const result =
    await applicationCollection.insertOne(
      application
    );

  return {
    ...application,
    id: result.insertedId.toString(),
  };
}

async function updateApplication(
  owner,
  applicationId,
  updates
) {
  return applicationCollection.updateOne(
    {
      _id: new ObjectId(applicationId),
      owner,
    },
    {
      $set: updates,
    }
  );
}

async function deleteApplication(
  owner,
  applicationId
) {
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
  updateUserToken,
  clearUserToken,
  getApplications,
  addApplication,
  updateApplication,
  deleteApplication,
};