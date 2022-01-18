/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Principle } = require('../../src/models')
const setup = require('../setup')
const dummyFactory = require('../dummyFactory')

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

  it('Create principle successfully', async function () {
    // Arrange
    const principle = dummyFactory.principle()

    // Act
    const savedPrinciple = await principle.save()

    // Assert
    expect(savedPrinciple._id).to.exist
    expect(savedPrinciple.num).to.equal(principle.num)
    expect(savedPrinciple.handle).to.equal(principle.handle)
    expect(savedPrinciple.title).to.equal(principle.title)
  })

  it('Create principle with extra field, field should be undefined', async function () {
    // Arrange
    const principle = dummyFactory.principle()

    // Act
    const savedPrincipleWithExtraField = await new Principle({
      principleId: principle.principleId,
      num: principle.num,
      handle: principle.handle,
      title: principle.title,
      extraField: 'extra field',
    }).save()

    // Arrange
    expect(savedPrincipleWithExtraField._id).to.exist
    expect(savedPrincipleWithExtraField.num).to.equal(principle.num)
    expect(savedPrincipleWithExtraField.handle).to.equal(principle.handle)
    expect(savedPrincipleWithExtraField.title).to.equal(principle.title)
    expect(savedPrincipleWithExtraField.extraField).not.to.exist
  })

  it('Create principle without required field should fail', async function () {
    // Arrange
    let error

    // Act
    try {
      await new Principle({}).save()
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
