const { Schema, model } = require('mongoose');

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
  },
  { timestamps: true }
);

const Annotation = model('Annotation', annotationSchema);

module.exports = {
  annotationSchema,
  Annotation,
};
