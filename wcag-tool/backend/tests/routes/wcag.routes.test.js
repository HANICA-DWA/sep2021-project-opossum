/* eslint-disable func-names, prefer-arrow-callback */
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../../src/app')
const setup = require('./setup')

chai.use(chaiHttp)
const { expect, request } = chai

describe('WCAG Endpoints', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  describe('Principle Endpoints', function () {
    it('GET all principles', async function () {
      const response = await request(app).get('/v1/wcag/principles')

      expect(response.status).to.equal(200)
      response.body.forEach((el) => {
        expect(el).contains.keys('principleId', 'num', 'handle', 'title')
      })
    })

    it('GET principle by principleId', async function () {
      const response = await request(app).get(
        '/v1/wcag/principles/WCAG2:perceivable'
      )

      expect(response.status).to.equal(200)
      expect(response.body).contains.keys(
        'principleId',
        'num',
        'handle',
        'title'
      )
    })

    it('GET principle by principleId with an invalid id should fail', async function () {
      const response = await request(app).get('/v1/wcag/principles/invalidId')

      expect(response.status).to.equal(404)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal('Principle not found!')
    })
  })

  describe('Guideline Endpoints', function () {
    it('GET all guidelines', async function () {
      const response = await request(app).get('/v1/wcag/guidelines')

      expect(response.status).to.equal(200)
      response.body.forEach((el) => {
        expect(el).contains.keys('guidelineId', 'num', 'handle', 'title')
      })
    })

    it('GET guideline by guidelineId', async function () {
      const response = await request(app).get(
        '/v1/wcag/guidelines/WCAG2:text-alternatives'
      )

      expect(response.status).to.equal(200)
      expect(response.body).contains.keys(
        'guidelineId',
        'num',
        'handle',
        'title'
      )
    })

    it('GET guideline by guidelineId with an invalid id should fail', async function () {
      const response = await request(app).get('/v1/wcag/guidelines/invalidId')

      expect(response.status).to.equal(404)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal('Guideline not found!')
    })
  })

  describe('SuccesCriterium endpoints', function () {
    it('GET all success criteria', async function () {
      const response = await request(app).get('/v1/wcag/successcriteria')

      expect(response.status).to.equal(200)
      response.body.forEach((el) => {
        expect(el).contains.keys('successCriteriumId', 'num', 'handle', 'title')
      })
    })

    it('GET success criteria by successCriteriumId', async function () {
      const response = await request(app).get(
        `/v1/wcag/successcriteria/WCAG2:non-text-content`
      )

      expect(response.status).to.equal(200)
      expect(response.body).contains.keys(
        'successCriteriumId',
        'num',
        'handle',
        'title',
        'level',
        'details'
      )
    })

    it('GET success criteria by successCriteriumId with an invalid id should fail', async function () {
      const response = await request(app).get(
        `/v1/wcag/successcriteria/invalidId`
      )

      expect(response.status).to.equal(404)
      expect(response.body).to.have.property('message')
      expect(response.body.message).to.equal('Success criterium not found!')
    })
  })
})
