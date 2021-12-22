/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Annotation } = require('../../src/models')
const setup = require('../setup')
const dummyFactory = require('../dummyFactory')

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

  it('Create annotation successfully', async function () {
    // Arrange
    const annotation = dummyFactory.annotation()

    // Act
    const savedAnnotation = await annotation.save()

    // Assert
    expect(savedAnnotation._id).to.exist
    expect(savedAnnotation.title).equals(annotation.title)
    expect(savedAnnotation.description).equals(savedAnnotation.description)
    expect(savedAnnotation.selector).equals(savedAnnotation.selector)
    expect(savedAnnotation.successCriterium.successCriteriumId).equals(
      savedAnnotation.successCriterium.successCriteriumId
    )
    expect(savedAnnotation.labels).equals(annotation.labels)
  })

  it('Create annotation with extra field, field should be undefined', async function () {
    // Arrange
    const annotation = dummyFactory.annotation()

    // Act
    const savedAnnotation = await new Annotation({
      title: annotation.title,
      description: annotation.description,
      selector: annotation.selector,
      successCriterium: annotation.successCriterium,
      extraField: 'extra field',
    }).save()

    // Assert
    expect(savedAnnotation._id).to.exist
    expect(savedAnnotation.title).equals(annotation.title)
    expect(savedAnnotation.description).equals(savedAnnotation.description)
    expect(savedAnnotation.selector).equals(savedAnnotation.selector)
    expect(savedAnnotation.successCriterium.successCriteriumId).equals(
      savedAnnotation.successCriterium.successCriteriumId
    )
    expect(savedAnnotation.extraField).to.not.exist
  })

  it('Create annotation without required fields should fail', async function () {
    // Arrange
    let error

    // Act
    try {
      await new Annotation({}).save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.title).to.exist
    expect(error.errors.description).to.exist
    expect(error.errors.selector).to.exist
    expect(error.errors.successCriterium).to.not.exist
  })

  it('Create annotation with wrong label should fail', async function () {
    // Arrange
    const annotation = dummyFactory.annotation()
    annotation.labels.push('wrong label')

    // Act
    let error
    try {
      await new Annotation(annotation).save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(Object.keys(error.errors)).includes('labels.1')
  })
})
