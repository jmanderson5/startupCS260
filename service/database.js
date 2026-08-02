const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url =
  `mongodb+srv://${encodeURIComponent(config.userName)}` +
  `:${encodeURIComponent(config.password)}` +
  `@${config.hostname}`;

const client = new MongoClient(url);
const database = client.db('internshipCommandCenter');

const userCollection = database.collection('users');
const applicationCollection =
  database.collection('applications');

async function connectToDatabase() {
  await client.connect();
  await database.command({ ping: 1 });
  console.log('Connected to MongoDB');
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