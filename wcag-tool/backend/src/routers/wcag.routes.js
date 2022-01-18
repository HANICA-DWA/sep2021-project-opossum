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
        __v: 0,
      }
    )

    return res.json(principles)
  } catch (err) {
    return next(err)
  }
})

router.get('/wcag/principles/:principleId', async (req, res, next) => {
  try {
    const { principleId } = req.params

    // TODO: Welke data is nodig?
    const principle = await Principle.find(
      { principleId },
      {
        _id: 0,
        __v: 0,
      }
    )
    if (!principle || principle.length <= 0)
      return next({ code: 404, message: 'Principle not found!' })

    return res.json(principle[0])
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
        __v: 0,
        techniques: 0,
      }
    )

    return res.send(guidelines)
  } catch (err) {
    return next(err)
  }
})

router.get('/wcag/guidelines/:guidelineId', async (req, res, next) => {
  try {
    const { guidelineId } = req.params

    // TODO: Welke dat is nodig?
    const guideline = await Guideline.find(
      { guidelineId },
      {
        _id: 0,
        __v: 0,
        techniques: 0,
      }
    )
    if (!guideline || guideline.length <= 0)
      return next({ code: 404, message: 'Guideline not found!' })

    return res.send(guideline[0])
  } catch (err) {
    return next(err)
  }
})

router.get('/wcag/successcriteria', async (req, res, next) => {
  try {
    // TODO: Welke data is nodig?
    const successcriteria = await SuccessCriterium.find(
      {},
      {
        _id: 0,
        __v: 0,
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

router.get('/wcag/successcriteria/:successCriteriumId', async (req, res, next) => {
  try {
    const { successCriteriumId } = req.params

    // TODO: Welke data is nodig?
    const successCriterium = await SuccessCriterium.find(
      { successCriteriumId },
      {
        _id: 0,
        __v: 0,
        principle: 0,
        guideline: 0,
        techniques: 0,
      }
    ).exec()
    if (!successCriterium || successCriterium.length <= 0)
      return next({ code: 404, message: 'Success criterium not found!' })

    return res.json(successCriterium[0])
  } catch (err) {
    return next(err)
  }
})

module.exports = {
  wcagRouter: router,
}
