const { Schema, model } = require('mongoose')
const { annotationSchema, Annotation } = require('./annotation.model')

const snapshotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    annotations: {
      type: [annotationSchema],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
)

// eslint-disable-next-line func-names
snapshotSchema.methods.addAnnotation = async function (title, description, selector) {
  const annotation = new Annotation({
    title,
    description,
    selector,
  })

  this.annotations.push(annotation)

  await this.save()

  return annotation
}

const Snapshot = model('Snapshot', snapshotSchema)

module.exports = {
  snapshotSchema,
  Snapshot,
}
