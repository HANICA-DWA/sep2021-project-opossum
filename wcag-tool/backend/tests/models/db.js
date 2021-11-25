const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

const setupDB = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
};

const dropDB = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

const dropCollections = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
};

module.exports = {
  setupDB,
  dropDB,
  dropCollections,
};
