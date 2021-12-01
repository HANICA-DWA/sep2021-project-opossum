/* eslint-disable func-names, prefer-arrow-callback, mocha/no-top-level-hooks, mocha/no-hooks-for-single-case */
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongod

async function before() {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

async function after() {
  if (mongod) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  }
}

async function afterEach() {
  if (mongod) {
    const { collections } = mongoose.connection

    Object.keys(collections).forEach((key) => {
      collections[key].deleteMany()
    })
  }
}

module.exports = {
  before,
  after,
  afterEach,
}
