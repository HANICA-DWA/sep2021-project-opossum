/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const fs = require('fs')
const path = require('path')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../../src/app')
const setup = require('../setup')
const { seedSnapshots } = require('../../src/utils/seed')
const { Snapshot } = require('../../src/models')

chai.use(chaiHttp)
const { expect, request } = chai

describe('Snapshot Endpoints', function () {
  before(async function () {
    await setup.before()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()
  })

  describe('POST Snapshot', function () {
    it('Post snapshot successfully', async function () {
      const dummySnapshot = {
        name: 'dummy snapshot',
        domain: 'test.com',
      }

      const response = await request(app)
        .post('/v1/snapshots')
        .type('form')
        .attach('file', fs.readFileSync(path.join(__dirname, 'snapshot.html')), 'filename.html')
        .field('name', dummySnapshot.name)
        .field('domain', dummySnapshot.domain)

      expect(response.status).equals(201)
      expect(response.body._id).to.exist
      expect(response.body.filename).to.exist
      expect(response.body.name).equals(dummySnapshot.name)
      expect(response.body.domain).equals(dummySnapshot.domain)
    })

    it('Post snapshot without a file should fail', async function () {
      const response = await request(app)
        .post('/v1/snapshots')
        .type('form')
        .field('name', 'untitled snapshot')
        .field('domain', 'test.com')

      expect(response.status).equals(400)
      expect(response.body.message).equals('File not provided!')
    })

    it('Post snapshot without required fields should fail', async function () {
      const response = await request(app)
        .post('/v1/snapshots')
        .type('form')
        .attach('file', fs.readFileSync(path.join(__dirname, 'snapshot.html')), 'filename.html')

      expect(response.status).equals(400)
    })
  })

  describe('GET Snapshots', function () {
    it('Get snapshots without pagination params should return all snapshots', async function () {
      await seedSnapshots()

      const response = await request(app).get('/v1/snapshots')

      expect(response.status).equals(200)
      expect(response.body.length).equals(10)
      response.body.forEach((annotation) => {
        expect(annotation).includes.keys([
          '_id',
          'name',
          'domain',
          'filename',
          'annotations',
          'createdAt',
          'updatedAt',
        ])
      })
    })

    it('Get snapshots with pagination params successfully', async function () {
      await seedSnapshots()

      const response = await request(app).get('/v1/snapshots?page=1&limit=4')
      const response2 = await request(app).get('/v1/snapshots?page=2&limit=4')
      const response3 = await request(app).get('/v1/snapshots?limit=10')

      expect(response.status).equals(200)
      expect(response.body[0].name.endsWith('0')).equals(true)
      expect(response.body[3].name.endsWith('3')).equals(true)

      expect(response2.status).equals(200)
      expect(response2.body[0].name.endsWith('4')).equals(true)
      expect(response2.body[3].name.endsWith('7')).equals(true)

      expect(response3.status).equals(200)
      expect(response3.body[0].name.endsWith('0')).equals(true)
      expect(response3.body[9].name.endsWith('9')).equals(true)
    })

    it('Get snapshots with invalid pagination params should fail', async function () {
      await seedSnapshots()

      const response = await request(app).get('/v1/snapshots?page=1')
      const response2 = await request(app).get('/v1/snapshots?limit=0')
      const response3 = await request(app).get('/v1/snapshots?page=1&limit=0')
      const response4 = await request(app).get('/v1/snapshots?page=0&limit=10')
      const response5 = await request(app).get('/v1/snapshots?page=0&limit=0')

      expect(response.status).equals(400)
      expect(response.body.message).equals('Invalid pagination parameters!')
      expect(response2.status).equals(400)
      expect(response2.body.message).equals('Invalid pagination parameters!')
      expect(response3.status).equals(400)
      expect(response3.body.message).equals('Invalid pagination parameters!')
      expect(response4.status).equals(400)
      expect(response4.body.message).equals('Invalid pagination parameters!')
      expect(response5.status).equals(400)
      expect(response5.body.message).equals('Invalid pagination parameters!')
    })

    it('Get snapshot with id successfully', async function () {
      const dummySnapshot = await new Snapshot({
        name: 'dummy snapshot',
        domain: 'test.com',
        filename: 'testfile',
      }).save()

      const response = await request(app).get(`/v1/snapshots/${dummySnapshot._id}`)

      expect(response.status).equals(200)
      expect(response.body._id).equals(dummySnapshot._id.toString())
      expect(response.body.name).equals(dummySnapshot.name)
      expect(response.body.domain).equals(dummySnapshot.domain)
      expect(response.body.filename).equals(dummySnapshot.filename)
      expect(response.body.createdAt).to.exist
      expect(response.body.updatedAt).to.exist
    })

    it('Get snapshot with non existent id should fail', async function () {
      const response = await request(app).get('/v1/snapshots/61b7284ded4084fd77ced98b')

      expect(response.status).equals(404)
      expect(response.body.message).equals('Snapshot not found!')
    })
  })

  describe('PATCH Snapshot', function () {
    it('Patch snapshot successfully', async function () {
      const dummySnapshot = await new Snapshot({
        name: 'dummy snapshot',
        domain: 'test.com',
        filename: 'testfile',
      }).save()

      const response = await request(app).patch(`/v1/snapshots/${dummySnapshot._id}`).send({
        name: 'edited name',
        domain: 'editeddomain.com',
      })

      expect(response.status).equals(200)
      expect(response.body.name).equals('edited name')
      expect(response.body.domain).equals('editeddomain.com')
    })

    it('Patch snapshot with non existent id should fail', async function () {
      const response = await request(app).patch('/v1/snapshots/61b7284ded4084fd77ced98b')

      expect(response.status).equals(404)
      expect(response.body.message).equals('Snapshot not found!')
    })
  })

  describe('DELETE Snapshot', function () {
    it('Delete snapshot successfully', async function () {
      const dummySnapshot = await new Snapshot({
        name: 'dummy snapshot',
        domain: 'test.com',
        filename: 'testfile',
      }).save()

      const response = await request(app).delete(`/v1/snapshots/${dummySnapshot._id}`)

      expect(response.status).equals(200)
      expect(response.body._id).equals(dummySnapshot._id.toString())
      expect(response.body.name).equals('dummy snapshot')
      expect(response.body.domain).equals('test.com')
      expect(response.body.filename).equals('testfile')
    })

    it('Delete snapshot with non existent id should fail', async function () {
      const response = await request(app).delete('/v1/snapshots/61b7284ded4084fd77ced98b')

      expect(response.status).equals(404)
      expect(response.body.message).equals('Snapshot not found!')
    })
  })
})
