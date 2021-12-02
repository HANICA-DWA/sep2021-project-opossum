const { Schema, model } = require('mongoose')
const { successCriteriumSchema } = require('./wcag.model')

const annotationSchema = new Schema(
  {
    successCriterium: {
      type: successCriteriumSchema,
      required: true,
    },
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
  },
  { timestamps: true }
)

const Annotation = model('Annotation', annotationSchema)

module.exports = {
  annotationSchema,
  Annotation,
}
