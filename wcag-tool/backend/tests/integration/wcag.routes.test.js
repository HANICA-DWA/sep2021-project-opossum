/* eslint-disable func-names, prefer-arrow-callback */
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../../src/app')
const { seedWCAG } = require('../../src/utils/seed')
const setup = require('../setup')
const dummyFactory = require('../dummyFactory')

chai.use(chaiHttp)
const { expect, request } = chai

describe('WCAG Endpoints', function () {
  let principle
  let guideline
  let successCriterium

  before(async function () {
    await setup.before()

    await seedWCAG()

    principle = dummyFactory.principle()
    guideline = dummyFactory.guideline()
    successCriterium = dummyFactory.successCriterium()
  })

  after(async function () {
    await setup.after()
  })

  describe('Principle Endpoints', function () {
    describe('GET Principles', function () {
      it('Get principles', async function () {
        // Act
        const response = await request(app).get('/v1/wcag/principles')

        // Assert
        expect(response.status).equals(200)
        response.body.forEach((el) => {
          expect(el).to.have.all.keys(
            'principleId',
            'num',
            'handle',
            'title',
            'createdAt',
            'updatedAt'
          )
        })
      })

      it('Get principle by principleId', async function () {
        // Act
        const response = await request(app).get(`/v1/wcag/principles/${principle.principleId}`)

        // Assert
        expect(response.status).equals(200)
        expect(response.body).to.have.all.keys([
          'principleId',
          'num',
          'handle',
          'title',
          'createdAt',
          'updatedAt',
        ])
        expect(response.body.principleId).equals(principle.principleId)
        expect(response.body.num).equals(principle.num)
        expect(response.body.handle).equals(principle.handle)
        expect(response.body.title).equals(principle.title)
      })

      it('Get principle by principleId with an non existent id should fail', async function () {
        // Act
        const response = await request(app).get('/v1/wcag/principles/invalidId')

        expect(response.status).equals(404)
        expect(response.body).to.have.all.keys(['message'])
        expect(response.body.message).equals('Principle not found!')
      })
    })
  })

  describe('Guideline Endpoints', function () {
    describe('GET Guidelines', function () {
      it('Get guidelines', async function () {
        // Act
        const response = await request(app).get('/v1/wcag/guidelines')

        // Assert
        expect(response.status).equals(200)
        response.body.forEach((el) => {
          expect(el).to.have.all.keys(
            'guidelineId',
            'num',
            'handle',
            'title',
            'createdAt',
            'updatedAt'
          )
        })
      })

      it('Get guideline by guidelineId', async function () {
        // Act
        const response = await request(app).get(`/v1/wcag/guidelines/${guideline.guidelineId}`)

        // Assert
        expect(response.status).equals(200)
        expect(response.body).to.have.all.keys(
          'guidelineId',
          'num',
          'handle',
          'title',
          'createdAt',
          'updatedAt'
        )
        expect(response.body.guidelineId).equals(guideline.guidelineId)
        expect(response.body.num).equals(guideline.num)
        expect(response.body.handle).equals(guideline.handle)
        expect(response.body.title).equals(guideline.title)
      })

      it('Get guideline by guidelineId with an invalid id should fail', async function () {
        // Act
        const response = await request(app).get('/v1/wcag/guidelines/invalidId')

        // Assert
        expect(response.status).equals(404)
        expect(response.body).to.have.all.keys(['message'])
        expect(response.body.message).equals('Guideline not found!')
      })
    })
  })

  describe('SuccesCriterium endpoints', function () {
    describe('GET Success criteria', function () {
      it('Get success criteria', async function () {
        // Act
        const response = await request(app).get('/v1/wcag/successcriteria')

        // Assert
        expect(response.status).equals(200)
        response.body.forEach((el) => {
          expect(el).to.have.all.keys(
            'successCriteriumId',
            'num',
            'handle',
            'title',
            'level',
            'details',
            'createdAt',
            'updatedAt'
          )
        })
      })

      it('Get success criterium by successCriteriumId', async function () {
        // Act
        const response = await request(app).get(
          `/v1/wcag/successcriteria/${successCriterium.successCriteriumId}`
        )

        // Assert
        expect(response.status).equals(200)
        expect(response.body).to.have.all.keys(
          'successCriteriumId',
          'num',
          'handle',
          'title',
          'level',
          'details',
          'createdAt',
          'updatedAt'
        )
        expect(response.body.successCriteriumId).equals(successCriterium.successCriteriumId)
        expect(response.body.num).equals(successCriterium.num)
        expect(response.body.handle).equals(successCriterium.handle)
        expect(response.body.level).equals(successCriterium.level)
        expect(response.body.details).deep.equals(successCriterium.details)
      })

      it('Get success criterium by successCriteriumId with an invalid id should fail', async function () {
        // Act
        const response = await request(app).get(`/v1/wcag/successcriteria/invalidId`)

        // Assert
        expect(response.status).equals(404)
        expect(response.body).to.have.all.keys(['message'])
        expect(response.body.message).equals('Success criterium not found!')
      })
    })
  })
})
