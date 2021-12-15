/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const setup = require('./setup')
const { Annotation } = require('../../src/models')

describe('Annotation Model', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()
  })

  it('Create annotation without required fields should fail', async function () {
    const annotation = new Annotation({})
    let error

    // Act
    try {
      await annotation.save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.title).to.exist
    expect(error.errors.description).to.exist
    expect(error.errors.selector).to.exist
  })
})
