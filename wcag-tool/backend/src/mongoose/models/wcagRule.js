const mongoose = require('mongoose');

const wcagRuleSchema = new mongoose.Schema({
  ruleId: {
    type: String,
    required: true,
    unique: true,
  },
  ruleName: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['A', 'AA', 'AAA'],
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line no-unused-vars
const WcagRule = mongoose.model('WcagRule', wcagRuleSchema);
