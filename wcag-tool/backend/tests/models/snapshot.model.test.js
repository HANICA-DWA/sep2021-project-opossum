/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const { expect } = require('chai')
const mongoose = require('mongoose')
const setup = require('./setup')
const { Snapshot } = require('../../src/models')

describe('Snapshot Model', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()
  })

  it('Delete annotation with correct id', async function () {
    // Arrange
    const snapshot = new Snapshot({
      name: 'testName',
      domain: 'testdomain.nl',
      filename: 'testfile.html',
    })
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Act
    const deletedAnnotation = await snapshot.deleteAnnotation(annotation._id)

    // Assert
    expect(deletedAnnotation.title).to.equal('testTitle')
    expect(deletedAnnotation.description).to.equal('testDescription')
    expect(deletedAnnotation.selector).to.equal('testSelector')
  })

  it('Delete annotation with no id', async function () {
    // Arrange
    const snapshot = new Snapshot({
      name: 'testName',
      domain: 'testdomain.nl',
      filename: 'testfile.html',
    })
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Act
    let error
    try {
      await snapshot.deleteAnnotation()
    } catch (err) {
      error = err
    }

    // Assert
    expect(error.message).to.equal('Annotation not found')
    expect(error).to.be.an.instanceof(Error)
  })

  it('Delete annotation with wrong id', async function () {
    // Arrange
    const snapshot = new Snapshot({
      name: 'testName',
      domain: 'testdomain.nl',
      filename: 'testfile.html',
    })
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Act
    let error
    try {
      await snapshot.deleteAnnotation('fakeId')
    } catch (err) {
      error = err
    }

    // Assert
    expect(error.message).to.equal('Annotation not found')
    expect(error).to.be.an.instanceof(Error)
  })
})
