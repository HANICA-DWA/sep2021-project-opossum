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

  test('Edit annotation in snapshot with no fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Act
    const updatedAnnotation = await snapshot.updateAnnotation(annotation.id)

    // Assert
    expect(updatedAnnotation.title).toBe('testTitle')
    expect(updatedAnnotation.description).toBe('testDescription')
    expect(updatedAnnotation.selector).toBe('testSelector')
  })

  test('Edit annotation in snapshot with one field', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Act
    const updatedAnnotation = await snapshot.updateAnnotation(annotation.id, {
      title: 'updatedTitle',
    })

    // Assert
    expect(updatedAnnotation.title).toBe('updatedTitle')
    expect(updatedAnnotation.description).toBe('testDescription')
    expect(updatedAnnotation.selector).toBe('testSelector')
  })

  test('Edit annotation in snapshot with required fields', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })
    const annotation = await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    // Act
    const updatedAnnotation = await snapshot.updateAnnotation(annotation.id, {
      title: 'updatedTitle',
      description: 'updatedDescription',
      selector: 'updatedSelector',
    })

    // Assert
    expect(updatedAnnotation.title).toBe('updatedTitle')
    expect(updatedAnnotation.description).toBe('updatedDescription')
    expect(updatedAnnotation.selector).toBe('updatedSelector')
  })

  test('Edit annotation in snapshot with non-existent annotation id throws error', async () => {
    // Arrange
    const snapshot = new Snapshot({ name: 'testName', domain: 'testdomain.nl' })
    await snapshot.addAnnotation('testTitle', 'testDescription', 'testSelector')

    const editAnnotation = async function () {
      await snapshot.updateAnnotation('fakeid123', {
        title: 'updatedTitle',
        description: 'updatedDescription',
        selector: 'updatedSelector',
      })
    }

    // Act
    // Assert
    await expect(editAnnotation).rejects.toThrowError('Annotation not found')
  })
})
