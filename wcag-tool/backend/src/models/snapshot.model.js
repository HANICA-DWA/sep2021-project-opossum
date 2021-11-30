const { Schema, model } = require('mongoose')
const { annotationSchema } = require('./annotation.model')

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

const Snapshot = model('Snapshot', snapshotSchema)

module.exports = {
  Snapshot,
}
