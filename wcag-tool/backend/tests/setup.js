/* eslint-disable func-names, prefer-arrow-callback, mocha/no-top-level-hooks, mocha/no-hooks-for-single-case */
const mongoose = require('mongoose')
const { getBucket } = require('../src/database')
// const { seedWCAG } = require('../src/utils/seed')

// Helper functions
async function clearDatabase() {
  const { collections } = mongoose.connection

  const promises = []

  Object.keys(collections).forEach((key) => {
    if (!['successcriteria', 'guidelines', 'principles'].includes(key)) {
      promises.push(collections[key].deleteMany())
    }
  })

  try {
    const bucket = getBucket('snapshot')
    if (bucket) await bucket.drop()
    // eslint-disable-next-line no-empty
  } catch (err) {}

  return Promise.all(promises)
}

// Setup functions
exports.before = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // await seedWCAG()
}

exports.after = async () => {
  // await mongoose.connection.dropDatabase()
  await clearDatabase()
  await mongoose.connection.close()
}

exports.afterEach = async () => {
  await clearDatabase()
}
