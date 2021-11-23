const express = require('express');
const { WcagRule } = require('../models/wcagRule');

const router = express.Router();

// basic example to be modified
// router to get all wcag rules
router.get('/', async (req, res, next) => {
  try {
    const wcagRules = await WcagRule.find();

    return res.send(wcagRules);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
