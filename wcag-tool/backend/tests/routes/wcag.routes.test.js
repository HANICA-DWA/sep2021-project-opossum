const mongoose = require('mongoose')
const request = require('supertest')
const { app } = require('../../src/app')

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoose.connection.close()
})

describe('WCAG Endpoints', () => {
  test('Get principles', async () => {
    // Arrange

    // Act
    const res = await request(app).get('/v1/wcag/principles')

    // Assert
    expect(res.statusCode).toEqual(200)
    res.body.forEach((el) =>
      expect(el).toContainKeys(['principleId', 'num', 'handle', 'title'])
    )
  })
})
