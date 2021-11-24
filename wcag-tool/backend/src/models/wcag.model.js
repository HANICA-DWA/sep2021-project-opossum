const { Schema, model } = require('mongoose');

// Web Content Accessibility Guideline
const wcagSchema = new Schema({
  w3Id: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  principle: {
    type: String,
    required: true,
    enum: ['1. Perceivable', '2. Operable', '3. Understandable', '4. Robust'],
  },
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['A', 'AA', 'AAA'],
  },
  description: {
    type: String,
    required: true,
  },
});

const Wcag = model('Wcag', wcagSchema);

module.exports = { wcagSchema, Wcag };
