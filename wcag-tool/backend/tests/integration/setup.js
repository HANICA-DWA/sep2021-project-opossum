/* eslint-disable func-names, prefer-arrow-callback, mocha/no-top-level-hooks, mocha/no-hooks-for-single-case */
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { seedWCAG } = require('../../src/utils/seed')

let mongod

exports.before = async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  await mongoose.connection.close()

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  await seedWCAG()
}

exports.after = async () => {
  if (mongod) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  }
}

exports.afterEach = async () => {
  try {
    await mongoose.connection.dropCollection('snapshots')
  } catch (err) {
    console.log('After each:', err)
  }
}
