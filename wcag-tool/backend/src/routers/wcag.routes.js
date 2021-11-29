const { Router } = require('express')
const { Wcag } = require('../models')

const router = new Router()

router.get('/wcag', async (req, res, next) => {
  try {
    const wcag = await Wcag.find({}).exec()

    return res.json(wcag)
  } catch (err) {
    return next(err)
  }
})

module.exports = {
  wcagRouter: router,
}
