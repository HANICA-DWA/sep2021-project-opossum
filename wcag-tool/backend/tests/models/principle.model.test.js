/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Principle } = require('../../src/models')
const setup = require('./setup')

describe('Principle Model', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()
  })

  it('Create & save principle successfully', async function () {
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
    expect(savedPrinciple._id).to.exist
    expect(savedPrinciple.num).to.equal(validPrinciple.num)
    expect(savedPrinciple.handle).to.equal(validPrinciple.handle)
    expect(savedPrinciple.title).to.equal(validPrinciple.title)
  })

  it('Create principle with extra field, field should be undefined', async function () {
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
    expect(savedPrincipleWithExtraField._id).to.exist
    expect(savedPrincipleWithExtraField.extraField).not.to.exist
  })

  it('Create principle without required field should fail', async function () {
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
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.principleId).to.exist
    expect(error.errors.num).to.exist
    expect(error.errors.handle).to.exist
    expect(error.errors.title).to.exist
  })
})
