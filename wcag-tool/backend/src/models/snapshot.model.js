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
snapshotSchema.methods.addAnnotation = async function (
  successCriterium,
  title,
  description,
  selector
) {
  const annotation = new Annotation({
    successCriterium,
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
  const annotation = this.annotations.id(id)
  if (!annotation) throw new Error('Annotation not found')

  annotation.successCriterium = fields?.successCriterium ?? annotation.successCriterium
  annotation.title = fields?.title ?? annotation.title
  annotation.description = fields?.description ?? annotation.description
  annotation.selector = fields?.selector ?? annotation.selector

  await this.save()

  return annotation
}

// eslint-disable-next-line func-names
snapshotSchema.methods.deleteAnnotation = async function (id) {
  const annotationToDelete = this.annotations.id(id)
  if (!annotationToDelete) throw new Error('Annotation not found')

  annotationToDelete.remove()

  await this.save()

  return annotationToDelete
}

const Snapshot = model('Snapshot', snapshotSchema)

module.exports = {
  Snapshot,
}
