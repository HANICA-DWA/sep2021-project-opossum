/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const fs = require('fs')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../../src/app')
const setup = require('./setup')

chai.use(chaiHttp)
const { expect, request } = chai

describe('Snapshot Endpoints', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  describe('Create', function () {
    it('Post snapshot successfully', async function () {
      const response = await await request(app)
        .post('/v1/snapshots')
        .type('form')
        .attach('file', fs.readFileSync('tests/routes/snapshot.html'), 'filename.html')
        .field('name', 'untitled snapshot')
        .field('domain', 'test.com')

      console.log('response', response.body)

      expect(response.status).equals(201)
      expect(response.body._id).to.exist
      expect(response.body.name).equals('untitled snapshot')
      expect(response.body.domain).equals('test.com')
    })

    it('Post snapshot without a file should fail', async function () {
      const response = await await request(app)
        .post('/v1/snapshots')
        .type('form')
        .field('name', 'untitled snapshot')
        .field('domain', 'test.com')

      console.log('response', response.body)

      expect(response.status).equals(400)
      expect(response.body.message).equals('File not provided!')
    })

    it('Post snapshot without required fields should fail', async function () {
      const response = await await request(app)
        .post('/v1/snapshots')
        .type('form')
        .attach('file', fs.readFileSync('tests/routes/snapshot.html'), 'filename.html')

      expect(response.status).equals(500)
      // expect(response.body.message).equals('File not provided!')
    })
  })
})
