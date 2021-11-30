const { Schema, model } = require('mongoose')

const principleSchema = new Schema(
  {
    principleId: {
      type: String,
      required: true,
    },
    num: {
      type: String,
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
  },
  { timestamps: true }
)

const Principle = model('Principle', principleSchema)

const guidelineSchema = new Schema(
  {
    guidelineId: {
      type: String,
      required: true,
    },
    num: {
      type: String,
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
    techniques: [Object],
  },
  { timestamps: true }
)

const Guideline = model('Guideline', guidelineSchema)

const successCriteriumSchema = new Schema(
  {
    principle: {
      type: principleSchema,
      required: true,
    },
    guideline: {
      type: guidelineSchema,
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
    details: {
      type: [Object],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
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
