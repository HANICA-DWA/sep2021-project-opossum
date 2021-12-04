/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { SuccessCriterium } = require('../../src/models')
const setup = require('./setup')

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

describe('SuccessCriterium Model', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()
  })

  it('Create & save success criterium successfully', async function () {
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
    expect(savedSuccessCriterium._id).to.exist
    expect(savedSuccessCriterium.principle).to.equal(validSuccessCriterium.principle)
    expect(savedSuccessCriterium.guideline).to.equal(validSuccessCriterium.guideline)
    expect(savedSuccessCriterium.successCriteriumId).to.equal(
      validSuccessCriterium.successCriteriumId
    )
    expect(savedSuccessCriterium.num).to.equal(validSuccessCriterium.num)
    expect(savedSuccessCriterium.level).to.equal(validSuccessCriterium.level)
    expect(savedSuccessCriterium.handle).to.equal(validSuccessCriterium.handle)
    expect(savedSuccessCriterium.title).to.equal(validSuccessCriterium.title)
    expect(savedSuccessCriterium.details).to.equal(validSuccessCriterium.details)
  })

  it('Create success criterium with extra field, field should be undefined', async function () {
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
    const savedSuccessCriteriumWithExtraField = await successCriteriumWithExtraField.save()

    // Arrange
    expect(savedSuccessCriteriumWithExtraField._id).to.exist
    expect(savedSuccessCriteriumWithExtraField.extraField).not.to.exist
  })

  it('Create successCriterium without required field should fail', async function () {
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
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.successCriteriumId).to.exist
    expect(error.errors.num).to.exist
    expect(error.errors.level).to.exist
    expect(error.errors.handle).to.exist
    expect(error.errors.title).to.exist
  })

  it('Create successCriterium with illegal level value should fail', async function () {
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
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.level).to.exist
    // TODO: Check message!
  })
})
