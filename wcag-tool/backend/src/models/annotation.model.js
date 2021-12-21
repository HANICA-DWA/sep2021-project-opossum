const { Schema, model } = require('mongoose')
const { successCriteriumSchema } = require('./wcag.model')

const annotationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    selector: {
      type: String,
      required: true,
    },
    successCriterium: {
      type: successCriteriumSchema,
      required: false,
    },
    labels: {
      type: [String],
      required: false,
      enum: ['Draft', 'Auto analysis'],
    },
  },
  { timestamps: true }
)

const Annotation = model('Annotation', annotationSchema)

module.exports = {
  annotationSchema,
  Annotation,
}
