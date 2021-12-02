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

// eslint-disable-next-line func-names
snapshotSchema.methods.updateAnnotation = async function (id, fields) {
  const annotationToEdit = this.annotations.id(id)
  if (!annotationToEdit) { throw new Error('Annotation not found')  }

  annotationToEdit.title = fields?.title ?? annotationToEdit.title
  annotationToEdit.description = fields?.description ?? annotationToEdit.description
  annotationToEdit.selector = fields?.selector ?? annotationToEdit.selector

  await this.save()

  return annotationToEdit
}

const Snapshot = model('Snapshot', snapshotSchema)

module.exports = {
  Snapshot,
}
