const mongoose = require('mongoose')
const db = require('./db')
const { Principle } = require('../../src/models')

beforeAll(async () => {
  await db.setupDB()
})

afterEach(async () => {
  await db.dropCollections()
})

afterAll(async () => {
  await db.dropDB()
})

describe('Principle Model', () => {
  test('Create & save principle successfully', async () => {
    // Arrange
    const validPrinciple = new Principle({
      principleId: 'principleId',
      num: '1',
      handle: 'example handle',
      title: 'example title',
    })

    // Act
    const savedPrinciple = await validPrinciple.save()

    // Assert
    expect(savedPrinciple._id).toBeDefined()
    expect(savedPrinciple.num).toBe(validPrinciple.num)
    expect(savedPrinciple.handle).toBe(validPrinciple.handle)
    expect(savedPrinciple.title).toBe(validPrinciple.title)
  })

  test('Create principle with extra field, field should be undefined', async () => {
    // Arrange
    const principleWithExtraField = new Principle({
      principleId: 'dummy id',
      num: '1',
      handle: 'dummy handle',
      title: 'dummy title',
      extraField: 'example ',
    })

    // Act
    const savedPrincipleWithExtraField = await principleWithExtraField.save()

    // Arrange
    expect(savedPrincipleWithExtraField._id).toBeDefined()
    expect(savedPrincipleWithExtraField.extraField).toBeUndefined()
  })

  test('Create principle without required field should fail', async () => {
    // Arrange
    const principleWithoutRequiredFields = new Principle({})
    let error

    // Act
    try {
      await principleWithoutRequiredFields.save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.principleId).toBeDefined()
    expect(error.errors.num).toBeDefined()
    expect(error.errors.handle).toBeDefined()
    expect(error.errors.title).toBeDefined()
  })
})
