const mongoose = require('mongoose');

const annotation = new mongoose.Schema(
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

const snapshot = new mongoose.Schema(
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
      type: [annotation],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line no-unused-vars
const Snapshot = mongoose.model('Snapshot', snapshot);
