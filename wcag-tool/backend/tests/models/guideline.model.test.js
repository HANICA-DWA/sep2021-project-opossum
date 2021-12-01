/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Guideline } = require('../../src/models')
const setup = require('./setup')

describe('Guideline Model', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()
  })

  it('Create & save guideline successfully', async function () {
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
    expect(savedGuideline._id).to.exist
    expect(savedGuideline.num).to.equal(validGuideline.num)
    expect(savedGuideline.handle).to.equal(validGuideline.handle)
    expect(savedGuideline.title).to.equal(validGuideline.title)
  })

  it('Create guideline with extra field, field should be undefined', async function () {
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
    expect(savedGuidelineWithExtraField._id).to.exist
    expect(savedGuidelineWithExtraField.extraField).not.to.exist
  })

  it('Create guideline without required field should fail', async function () {
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
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.guidelineId).to.exist
    expect(error.errors.num).to.exist
    expect(error.errors.handle).to.exist
    expect(error.errors.title).to.exist
  })
})
