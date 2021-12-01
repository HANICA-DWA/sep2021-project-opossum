const mongoose = require('mongoose')
const db = require('./db')
const { Snapshot } = require('../../src/models/snapshot.model')

beforeAll(async () => {
  await db.setupDB()
})

afterEach(async () => {
  await db.dropCollections()
})

afterAll(async () => {
  await db.dropDB()
})

describe('Snapshot model', () => {
  test('Add annotation to snapshot with required fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Assert
    expect(annotation.title).toBe('testTitle')
    expect(annotation.description).toBe('testDescription')
    expect(annotation.selector).toBe('testSelector')
  })

  test('Add annotation to snapshot with extra fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    const annotation = await snapshot.addAnnotation(
      'testTitle',
      'testDescription',
      'testSelector',
      'testExtra'
    )

    // Assert
    expect(annotation.title).toBe('testTitle')
    expect(annotation.description).toBe('testDescription')
    expect(annotation.selector).toBe('testSelector')
  })

  test('Add annotation to snapshot with no fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    let error
    try {
      const annotation = await snapshot.addAnnotation()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  test('Add annotation to snapshot with missing field', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    let error
    try {
      const annotation = await snapshot.addAnnotation('testTitle', 'testDescription')
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  xtest('Edit annotation in snapshot with required fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Assert
    expect(annotation.title).toBe('testTitle')
    expect(annotation.description).toBe('testDescription')
    expect(annotation.selector).toBe('testSelector')
  })

  xtest('Add annotation to snapshot with extra fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    const annotation = await snapshot.addAnnotation(
      'testTitle',
      'testDescription',
      'testSelector',
      'testExtra'
    )

    // Assert
    expect(annotation.title).toBe('testTitle')
    expect(annotation.description).toBe('testDescription')
    expect(annotation.selector).toBe('testSelector')
  })

  xtest('Add annotation to snapshot with no fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    let error
    try {
      const annotation = await snapshot.addAnnotation()
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  xtest('Add annotation to snapshot with missing field', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })

    // Act
    let error
    try {
      const annotation = await snapshot.addAnnotation('testTitle', 'testDescription')
    } catch (_error) {
      error = _error
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
  })
})
