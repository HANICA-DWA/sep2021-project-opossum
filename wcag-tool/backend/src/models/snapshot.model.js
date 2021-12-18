const { Schema, model } = require('mongoose')
const { annotationSchema, Annotation } = require('./annotation.model')
const { SuccessCriterium } = require('./wcag.model')

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
  title,
  description,
  selector,
  successCriterium
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
  if (!annotation) throw new Error('Annotation not found!')

  if (!fields || Object.keys(fields).length === 0) throw new Error('Fields not provided!')

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
  if (!annotationToDelete) return undefined

  annotationToDelete.remove()

  await this.save()

  return annotationToDelete
}

const Snapshot = model('Snapshot', snapshotSchema)

module.exports = {
  Snapshot,
}
