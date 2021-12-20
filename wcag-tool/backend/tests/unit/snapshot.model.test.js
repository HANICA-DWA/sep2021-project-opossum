/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const { Snapshot } = require('../../src/models')
const setup = require('../setup')
const dummyFactory = require('../dummyFactory')

describe('Snapshot Model', function () {
  let snapshot
  let annotation

  before(async function () {
    await setup.before()

    snapshot = dummyFactory.snapshot()
    annotation = dummyFactory.annotation()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()

    snapshot = dummyFactory.snapshot()
    annotation = dummyFactory.annotation()
  })

  it('Create snapshot successfully', async function () {
    // Act
    const savedSnapshot = await new Snapshot({
      name: snapshot.name,
      domain: snapshot.domain,
      filename: snapshot.filename,
    }).save()

    // Assert
    expect(savedSnapshot._id).to.exist
    expect(savedSnapshot.name).equals(snapshot.name)
    expect(savedSnapshot.domain).equals(snapshot.domain)
    expect(savedSnapshot.filename).equals(snapshot.filename)
  })

  it('Create snapshot with extra field, field should be undefined', async function () {
    // Act
    const savedSnapshot = await new Snapshot({
      name: snapshot.name,
      domain: snapshot.domain,
      filename: snapshot.filename,
      extraField: 'extra field',
    }).save()

    // Assert
    expect(savedSnapshot._id).to.exist
    expect(savedSnapshot.name).equals(snapshot.name)
    expect(savedSnapshot.domain).equals(snapshot.domain)
    expect(savedSnapshot.filename).equals(snapshot.filename)
    expect(savedSnapshot.extraField).to.not.exist
  })

  it('Create snapshot without required fields should fail', async function () {
    // Arrange
    let error

    // Act
    try {
      await new Snapshot({}).save()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
    expect(error.errors.name).to.exist
    expect(error.errors.domain).to.exist
    expect(error.errors.filename).to.exist
  })

  describe('addAnnotation method', function () {
    it('Add annotation to snapshot successfully', async function () {
      // Act
      const savedAnnotation = await snapshot.addAnnotation(
        annotation.title,
        annotation.description,
        annotation.selector,
        annotation.successCriterium
      )

      // Assert
      expect(savedAnnotation._id).to.exist
      expect(savedAnnotation.title).equals(annotation.title)
      expect(savedAnnotation.description).equals(annotation.description)
      expect(savedAnnotation.selector).equals(annotation.selector)
      expect(savedAnnotation.successCriterium.successCriteriumId).equals(
        annotation.successCriterium.successCriteriumId
      )
    })

    it('Add annotation to snapshot without required fields should fail', async function () {
      // Arrange
      let error

      // Act
      try {
        await snapshot.addAnnotation()
      } catch (_error) {
        error = _error
      }

      // Assert
      expect(error).to.be.instanceOf(mongoose.Error.ValidationError)
      expect(Object.keys(error.errors)).includes('annotations.0.title')
      expect(Object.keys(error.errors)).includes('annotations.0.description')
      expect(Object.keys(error.errors)).includes('annotations.0.selector')
      expect(Object.keys(error.errors)).not.includes('annotations.0.successCriterium')
    })
  })

  describe('updateAnnotation method', function () {
    it('Update annotation in snapshot successfully', async function () {
      // Arrange
      const savedAnnotation = await snapshot.addAnnotation(
        annotation.title,
        annotation.description,
        annotation.selector,
        annotation.successCriterium
      )

      // Act
      const updatedAnnotation = await snapshot.updateAnnotation(savedAnnotation._id, {
        title: 'updated title',
        description: 'updated description',
        selector: 'updated selector',
      })

      // Assert
      expect(updatedAnnotation._id).equals(savedAnnotation._id)
      expect(updatedAnnotation.title).equals('updated title')
      expect(updatedAnnotation.description).equals('updated description')
      expect(updatedAnnotation.selector).equals('updated selector')
    })

    it('Update annotation in snapshot with no fields should fail', async function () {
      // Arrange
      const savedAnnotation = await snapshot.addAnnotation(
        annotation.title,
        annotation.description,
        annotation.selector,
        annotation.successCriterium
      )
      let error
      let error2

      // Act
      try {
        await snapshot.updateAnnotation(savedAnnotation._id, {})
      } catch (_error) {
        error = _error
      }
      try {
        await snapshot.updateAnnotation(savedAnnotation._id)
      } catch (_error) {
        error2 = _error
      }

      // Assert
      expect(error.message).equals('Fields not provided!')
      expect(error2.message).equals('Fields not provided!')
    })

    it('Update annotation in snapshot with extra field, field should be undefined', async function () {
      // Arrange
      const savedAnnotation = await snapshot.addAnnotation(
        annotation.title,
        annotation.description,
        annotation.selector,
        annotation.successCriterium
      )

      // Act
      const updatedAnnotation = await snapshot.updateAnnotation(savedAnnotation._id, {
        title: 'updated title',
        description: 'updated description',
        selector: 'updated selector',
        extraField: 'extra field',
      })

      // Assert
      expect(updatedAnnotation._id).equals(savedAnnotation._id)
      expect(updatedAnnotation.title).equals('updated title')
      expect(updatedAnnotation.description).equals('updated description')
      expect(updatedAnnotation.selector).equals('updated selector')
      expect(updatedAnnotation.extraField).to.not.exist
    })
  })

  describe('deleteAnnotation method', function () {
    it('Delete annotation from snapshot successfully', async function () {
      // Arrange
      const savedAnnotation = await snapshot.addAnnotation(
        annotation.title,
        annotation.description,
        annotation.selector,
        annotation.successCriterium
      )

      // Act
      const deletedAnnotation = await snapshot.deleteAnnotation(savedAnnotation._id)

      // Assert
      expect(deletedAnnotation.title).equals(annotation.title)
      expect(deletedAnnotation.description).equals(annotation.description)
      expect(deletedAnnotation.selector).equals(annotation.selector)
      expect(deletedAnnotation.successCriterium.successCriteriumId).equals(
        annotation.successCriterium.successCriteriumId
      )
    })

    it('Delete annotation from snapshot with no annotationId should fail', async function () {
      // Act
      const deletedAnnotation = await snapshot.deleteAnnotation()

      // Assert
      expect(deletedAnnotation).is.undefined
    })

    it('Delete annotation from snapshot with non existent annotationId', async function () {
      // Act
      const deletedAnnotation = await snapshot.deleteAnnotation('fakeid')

      // Assert
      expect(deletedAnnotation).to.equal(undefined)
    })
  })
})
