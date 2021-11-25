const mongoose = require('mongoose');
const db = require('./db');
const { Annotation } = require('../../src/models/annotation.model');

beforeAll(async () => {
  await db.setupDB();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDB();
});

describe('Annotation model', () => {
  xtest('Create annotation without required field should fail', async () => {
    // Arrange
    const annotation = new Annotation({});
    let error;

    // Act
    try {
      const _annotation = await annotation.save();
    } catch (_error) {
      error = _error;
    }

    // Assert
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    // expect(error.errors.email).toBeDefined();
  });
});
