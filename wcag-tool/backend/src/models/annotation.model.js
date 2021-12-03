const { Schema, model } = require('mongoose')
const { successCriteriumSchema } = require('./wcag.model')

const annotationSchema = new Schema(
  {
    successCriteriumId: {
      type: String,
      ref: 'SuccessCriterium',
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
