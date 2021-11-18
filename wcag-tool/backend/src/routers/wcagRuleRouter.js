const mongoose = require('mongoose');
require('../mongoose/models/wcagRule');
const express = require('express');

const router = express.Router();
const wcagRule = mongoose.model('WcagRule');

// basic example to be modified
// router to get all wcag rules
router.get('/', async (req, res, next) => {
  try {
    const wcagRules = await wcagRule.find();
    res.send(wcagRules);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
