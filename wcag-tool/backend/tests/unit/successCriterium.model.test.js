/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { SuccessCriterium } = require('../../src/models')
const setup = require('../setup')
const dummyFactory = require('../dummyFactory')

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

  it('Create success criterium successfully', async function () {
    // Arrange
    const successCriterium = dummyFactory.successCriterium()

    // Act
    const savedSuccessCriterium = await successCriterium.save()

    // Assert
    expect(savedSuccessCriterium._id).to.exist
    expect(savedSuccessCriterium.principle).equals(successCriterium.principle)
    expect(savedSuccessCriterium.guideline).equals(successCriterium.guideline)
    expect(savedSuccessCriterium.successCriteriumId).equals(successCriterium.successCriteriumId)
    expect(savedSuccessCriterium.num).equals(successCriterium.num)
    expect(savedSuccessCriterium.level).equals(successCriterium.level)
    expect(savedSuccessCriterium.handle).equals(successCriterium.handle)
    expect(savedSuccessCriterium.title).equals(successCriterium.title)
    expect(savedSuccessCriterium.details).equals(successCriterium.details)
  })

  it('Create success criterium with extra field, field should be undefined', async function () {
    // Arrange
    const successCriterium = dummyFactory.successCriterium()

    // Act
    const savedSuccessCriteriumWithExtraField = await new SuccessCriterium({
      successCriteriumId: successCriterium.successCriteriumId,
      num: successCriterium.num,
      level: successCriterium.level,
      handle: successCriterium.handle,
      title: successCriterium.title,
      details: successCriterium.details,
      extraField: 'extra field',
    }).save()

    // Arrange
    expect(savedSuccessCriteriumWithExtraField._id).to.exist
    expect(savedSuccessCriteriumWithExtraField.successCriteriumId).equals(
      successCriterium.successCriteriumId
    )
    expect(savedSuccessCriteriumWithExtraField.num).equals(successCriterium.num)
    expect(savedSuccessCriteriumWithExtraField.level).equals(successCriterium.level)
    expect(savedSuccessCriteriumWithExtraField.handle).equals(successCriterium.handle)
    expect(savedSuccessCriteriumWithExtraField.title).equals(successCriterium.title)
    expect(savedSuccessCriteriumWithExtraField.details).deep.equals(successCriterium.details)
    expect(savedSuccessCriteriumWithExtraField.extraField).not.to.exist
  })

  it('Create successCriterium without required field should fail', async function () {
    // Arrange
    let error

    // Act
    try {
      await new SuccessCriterium({}).save()
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
    const successCriterium = dummyFactory.successCriterium()
    let error

    // Act
    try {
      await new SuccessCriterium({
        successCriteriumId: successCriterium.successCriteriumId,
        num: successCriterium.num,
        level: 'X',
        handle: successCriterium.handle,
        title: successCriterium.title,
        details: successCriterium.details,
      }).save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.level).to.exist
  })
})
