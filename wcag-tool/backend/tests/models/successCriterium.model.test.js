const mongoose = require('mongoose')
const db = require('./db')
const { SuccessCriterium } = require('../../src/models')

const dummyPrinciple = {
  principleId: 'principleId',
  num: '1',
  handle: 'example handle',
  title: 'example title',
}
const dummyGuideline = {
  guidelineId: 'guidelineId',
  num: '1.1',
  handle: 'example handle',
  title: 'example title',
  extraField: 'example ',
}

beforeAll(async () => {
  await db.setupDB()
})

afterEach(async () => {
  await db.dropCollections()
})

afterAll(async () => {
  await db.dropDB()
})

describe('SuccessCriterium Model', () => {
  test('Create & save success criterium successfully', async () => {
    // Arrange
    const validSuccessCriterium = new SuccessCriterium({
      principle: dummyPrinciple,
      guideline: dummyGuideline,
      successCriteriumId: 'successCriteriumId',
      num: '1.1.1',
      level: 'A',
      handle: 'dummy handle',
      title: 'dummy title',
      details: [{ dummy: 'dummy' }],
    })

    // Act
    const savedSuccessCriterium = await validSuccessCriterium.save()

    // Assert
    expect(savedSuccessCriterium._id).toBeDefined()
    expect(savedSuccessCriterium.principle).toBe(
      validSuccessCriterium.principle
    )
    expect(savedSuccessCriterium.guideline).toBe(
      validSuccessCriterium.guideline
    )
    expect(savedSuccessCriterium.successCriteriumId).toBe(
      validSuccessCriterium.successCriteriumId
    )
    expect(savedSuccessCriterium.num).toBe(validSuccessCriterium.num)
    expect(savedSuccessCriterium.level).toBe(validSuccessCriterium.level)
    expect(savedSuccessCriterium.handle).toBe(validSuccessCriterium.handle)
    expect(savedSuccessCriterium.title).toBe(validSuccessCriterium.title)
    expect(savedSuccessCriterium.details).toBe(validSuccessCriterium.details)
  })

  test('Create success criterium with extra field, field should be undefined', async () => {
    // Arrange
    const successCriteriumWithExtraField = new SuccessCriterium({
      principle: dummyPrinciple,
      guideline: dummyGuideline,
      successCriteriumId: 'successCriteriumId',
      num: '1.1.1',
      level: 'A',
      handle: 'dummy handle',
      title: 'dummy title',
      details: [{ dummy: 'dummy' }],
      extraField: 'extra field',
    })

    // Act
    const savedSuccessCriteriumWithExtraField =
      await successCriteriumWithExtraField.save()

    // Arrange
    expect(savedSuccessCriteriumWithExtraField._id).toBeDefined()
    expect(savedSuccessCriteriumWithExtraField.extraField).toBeUndefined()
  })

  test('Create successCriterium without required field should fail', async () => {
    // Arrange
    const successCriteriumWithoutRequiredFields = new SuccessCriterium({})
    let error

    // Act
    try {
      await successCriteriumWithoutRequiredFields.save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.principle).toBeDefined()
    expect(error.errors.guideline).toBeDefined()
    expect(error.errors.successCriteriumId).toBeDefined()
    expect(error.errors.num).toBeDefined()
    expect(error.errors.level).toBeDefined()
    expect(error.errors.handle).toBeDefined()
    expect(error.errors.title).toBeDefined()
    expect(error.errors.details).toBeDefined()
  })

  test('Create successCriterium with empty details array should fail', async () => {
    // Arrange
    const successCriteriumWithoutDetails = new SuccessCriterium({
      principle: dummyPrinciple,
      guideline: dummyGuideline,
      successCriteriumId: 'successCriteriumId',
      num: '1.1.1',
      level: 'A',
      handle: 'dummy handle',
      title: 'dummy title',
      details: [],
    })
    let error

    // Act
    try {
      await successCriteriumWithoutDetails.save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.details).toBeDefined()
  })

  test('Create successCriterium with illegal level value should fail', async () => {
    // Arrange
    const successCriteriumWithoutDetails = new SuccessCriterium({
      principle: dummyPrinciple,
      guideline: dummyGuideline,
      successCriteriumId: 'successCriteriumId',
      num: '1.1.1',
      level: 'X',
      handle: 'dummy handle',
      title: 'dummy title',
      details: [],
    })
    let error

    // Act
    try {
      await successCriteriumWithoutDetails.save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.level).toBeDefined()
  })
})
