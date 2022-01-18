/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Guideline } = require('../../src/models')
const setup = require('../setup')
const dummyFactory = require('../dummyFactory')

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

  it('Create guideline successfully', async function () {
    // Arrange
    const guideline = dummyFactory.guideline()

    // Act
    const savedGuideline = await guideline.save()

    // Assert
    expect(savedGuideline._id).to.exist
    expect(savedGuideline.num).equals(guideline.num)
    expect(savedGuideline.handle).equals(guideline.handle)
    expect(savedGuideline.title).equals(guideline.title)
  })

  it('Create guideline with extra field, field should be undefined', async function () {
    // Arrange
    const guideline = dummyFactory.guideline()

    // Act
    const savedGuidelineWithExtraField = await new Guideline({
      guidelineId: guideline.guidelineId,
      num: guideline.num,
      handle: guideline.handle,
      title: guideline.title,
      extraField: 'extra field',
    }).save()

    // Arrange
    expect(savedGuidelineWithExtraField._id).to.exist
    expect(savedGuidelineWithExtraField.num).equals(guideline.num)
    expect(savedGuidelineWithExtraField.handle).equals(guideline.handle)
    expect(savedGuidelineWithExtraField.title).equals(guideline.title)
    expect(savedGuidelineWithExtraField.extraField).not.to.exist
  })

  it('Create guideline without required field should fail', async function () {
    // Arrange
    let error

    // Act
    try {
      await new Guideline({}).save()
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
