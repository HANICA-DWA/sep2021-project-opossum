const { Router } = require('express')
const { SuccessCriterium, Principle, Guideline } = require('../models')

const router = new Router()

router.get('/wcag/principles', async (req, res, next) => {
  try {
    // TODO: Welke data is nodig?
    const principles = await Principle.find(
      {},
      {
        _id: 0,
      }
    )

    return res.json(principles)
  } catch (err) {
    return next(err)
  }
})

router.get('/wcag/guidelines', async (req, res, next) => {
  try {
    // TODO: Welke dat is nodig?
    const guidelines = await Guideline.find(
      {},
      {
        _id: 0,
        techniques: 0,
      }
    )

    return res.send(guidelines)
  } catch (err) {
    return next(err)
  }
})

router.get('/wcag/successcritera', async (req, res, next) => {
  try {
    // TODO: Welke data is nodig?
    const successcriteria = await SuccessCriterium.find(
      {},
      {
        _id: 0,
        principle: 0,
        guideline: 0,
        techniques: 0,
      }
    ).exec()

    return res.json(successcriteria)
  } catch (err) {
    return next(err)
  }
})

module.exports = {
  wcagRouter: router,
}
