const { Schema, model } = require('mongoose')

// Web Content Accessibility Guideline
const principleSchema = new Schema({
  principleId: {
    type: String,
    required: true,
    unique: true,
  },
  num: {
    type: String,
    required: true,
    unique: true,
  },
  handle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const Principle = model('Principle', principleSchema)

const guidelineSchema = new Schema({
  guidelineId: {
    type: String,
    require: true,
    unique: true,
  },
  num: {
    type: String,
    required: true,
    unique: true,
  },
  handle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  techniques: [Object],
})

const Guideline = model('Guideline', guidelineSchema)

const successCriteriumSchema = new Schema(
  {
    principle: {
      type: Schema.Types.ObjectId,
      ref: 'Principle',
      required: true,
    },
    guideline: {
      type: Schema.Types.ObjectId,
      ref: 'Guideline',
      required: true,
    },
    successCriteriumId: {
      type: String,
      required: true,
      unique: true,
    },
    num: {
      type: String,
      required: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ['A', 'AA', 'AAA'],
      required: true,
    },
    handle: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: [
      {
        handle: {
          type: String,
          required: true,
          default: 'test',
        },
        text: {
          type: String,
          required: true,
          default: 'test',
        },
      },
    ],
    techniques: {
      type: [Object],
    },
  },
  { timestamps: true }
)

const SuccessCriterium = model('SuccessCriterium', successCriteriumSchema)

module.exports = {
  Principle,
  Guideline,
  SuccessCriterium,
}
