const mongoose = require('mongoose')
const db = require('./db')
const { Guideline } = require('../../src/models')

beforeAll(async () => {
  await db.setupDB()
})

afterEach(async () => {
  await db.dropCollections()
})

afterAll(async () => {
  await db.dropDB()
})

describe('Guideline Model', () => {
  test('Create & save guideline successfully', async () => {
    // Arrange
    const validGuideline = new Guideline({
      guidelineId: 'guidelineId',
      num: '1.1',
      handle: 'example handle',
      title: 'example title',
    })

    // Act
    const savedGuideline = await validGuideline.save()

    // Assert
    expect(savedGuideline._id).toBeDefined()
    expect(savedGuideline.num).toBe(validGuideline.num)
    expect(savedGuideline.handle).toBe(validGuideline.handle)
    expect(savedGuideline.title).toBe(validGuideline.title)
  })

  test('Create guideline with extra field, field should be undefined', async () => {
    // Arrange
    const guidelineWithExtraField = new Guideline({
      guidelineId: 'guidelineId',
      num: '1.1',
      handle: 'example handle',
      title: 'example title',
      extraField: 'example ',
    })

    // Act
    const savedGuidelineWithExtraField = await guidelineWithExtraField.save()

    // Arrange
    expect(savedGuidelineWithExtraField._id).toBeDefined()
    expect(savedGuidelineWithExtraField.extraField).toBeUndefined()
  })

  test('Create guideline without required field should fail', async () => {
    // Arrange
    const principleWithoutRequiredFields = new Guideline({})
    let error

    // Act
    try {
      await principleWithoutRequiredFields.save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.guidelineId).toBeDefined()
    expect(error.errors.num).toBeDefined()
    expect(error.errors.handle).toBeDefined()
    expect(error.errors.title).toBeDefined()
  })
})
