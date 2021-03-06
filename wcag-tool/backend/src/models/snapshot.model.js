const { Schema, model } = require('mongoose')
const sanitizeHtml = require('sanitize-html')
const { annotationSchema, Annotation } = require('./annotation.model')

const sanitizeOptions = {
  allowedTags: ['h1', 'h2', 'h3', 'strong', 'i', 'p', 'br'],
  allowedAttributes: {},
}

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
  successCriterium,
  labels
) {
  const annotation = new Annotation({
    successCriterium,
    title: sanitizeHtml(title, sanitizeOptions),
    description: sanitizeHtml(description, sanitizeOptions),
    selector,
    labels,
  })

  this.annotations.push(annotation)

  await this.save()

  return annotation
}

snapshotSchema.methods.addAnnotations = async function (annotations) {
  const _annotations = annotations.map(
    ({ title, description, selector, successCriterium, labels }) =>
      new Annotation({
        title: sanitizeHtml(title, sanitizeOptions),
        description: sanitizeHtml(description, sanitizeOptions),
        selector,
        successCriterium,
        labels,
      })
  )

  _annotations.forEach((annotation) => this.annotations.push(annotation))

  await this.save()

  return _annotations
}

// eslint-disable-next-line func-names
snapshotSchema.methods.updateAnnotation = async function (id, fields) {
  const annotation = this.annotations.id(id)
  if (!annotation) throw new Error('Annotation not found!')

  if (!fields || Object.keys(fields).length === 0) throw new Error('Fields not provided!')

  annotation.successCriterium = fields?.successCriterium ?? annotation.successCriterium
  annotation.title = sanitizeHtml(fields?.title ?? annotation.title, sanitizeOptions)
  annotation.description = sanitizeHtml(
    fields?.description ?? annotation.description,
    sanitizeOptions
  )
  annotation.selector = fields?.selector ?? annotation.selector
  annotation.labels = fields?.labels ?? annotation.labels

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
