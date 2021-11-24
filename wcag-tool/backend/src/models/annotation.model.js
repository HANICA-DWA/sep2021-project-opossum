const { Schema, model } = require('mongoose');

const annotationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    selector: {
      type: String,
      required: true,
    },
    severity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
      max: 3,
    },
  },
  { timestamps: true }
);

const Annotation = model('Annotation', annotationSchema);

module.exports = {
  annotationSchema,
  Annotation,
};
