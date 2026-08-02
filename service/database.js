const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const connectionString = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(connectionString);
const db = client.db('internshipCommandCenter');

const userCollection = database.collection('users');
const applicationCollection = database.collection('applications');

async function main() {
  try {
    await database.command({ ping: 1 });
    console.log('Connected to MongoDB');
  } finally {
    client.close();
  }
}

main();