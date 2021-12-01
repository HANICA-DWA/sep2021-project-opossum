const mongoose = require('mongoose')
const db = require('./db')
const { Annotation } = require('../../src/models/annotation.model')

beforeAll(async () => {
  await db.setupDB()
})

afterEach(async () => {
  await db.dropCollections()
})

afterAll(async () => {
  await db.dropDB()
})

describe('Annotation model', () => {
  test('Create annotation without required fields should fail', async () => {
    // Arrange
    const annotation = new Annotation({})
    let error

    // Act
    try {
      await annotation.save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.title).toBeDefined()
    expect(error.errors.description).toBeDefined()
    expect(error.errors.selector).toBeDefined()
  })
})
