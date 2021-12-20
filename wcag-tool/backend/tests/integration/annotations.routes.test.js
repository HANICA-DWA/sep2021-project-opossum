/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const { app } = require('../../src/app')
const setup = require('../setup')
const dummyFactory = require('../dummyFactory')

chai.use(chaiHttp)
const { expect, request } = chai

describe('Annotation Endpoints', function () {
  let snapshot
  let annotation

  before(async function () {
    await setup.before()

    snapshot = await dummyFactory.snapshot().save()
    annotation = dummyFactory.annotation()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    await setup.afterEach()

    snapshot = await dummyFactory.snapshot().save()
  })

  describe('Annotation Endpoints', function () {
    describe('POST Annotation', function () {
      it('Post annotation successfully', async function () {
        // Act
        const response = await request(app)
          .post(`/v1/snapshots/${snapshot._id.toString()}/annotations`)
          .send({
            successCriterium: annotation.successCriterium,
            title: annotation.title,
            description: annotation.description,
            selector: annotation.selector,
          })

        // Assert
        expect(response.status).equals(201)
        expect(response.body._id).to.exist
        expect(response.body.title).equals(annotation.title)
        expect(response.body.description).equals(annotation.description)
        expect(response.body.selector).equals(annotation.selector)
        expect(response.body.successCriterium.successCriteriumId).equals(
          annotation.successCriterium.successCriteriumId
        )
      })

      it('Post annotation with invalid success criterium should fail', async function () {
        const response = await request(app)
          .post(`/v1/snapshots/${snapshot._id.toString()}/annotations`)
          .send({
            successCriterium: {
              foo: 'bar',
            },
            title: annotation.title,
            description: annotation.description,
            selector: annotation.selector,
          })
        expect(response.status).equals(400)
      })

      it('Post annotation without required fields should fail', async function () {
        const response = await request(app).post(
          `/v1/snapshots/${snapshot._id.toString()}/annotations`
        )

        expect(response.status).equals(400)
      })
    })

    describe('GET Annotation', function () {
      it('Get annotations successfully', async function () {
        await snapshot.addAnnotation(annotation.title, annotation.description, annotation.selector)
        await snapshot.addAnnotation(annotation.title, annotation.description, annotation.selector)
        await snapshot.addAnnotation(annotation.title, annotation.description, annotation.selector)

        const response = await request(app).get(
          `/v1/snapshots/${snapshot._id.toString()}/annotations`
        )

        expect(response.status).equals(200)
        expect(response.body.length).equals(3)
        response.body.forEach((_annotation) => {
          expect(_annotation._id.toString()).to.exist
          expect(_annotation.title).equals(annotation.title)
          expect(_annotation.description).equals(annotation.description)
          expect(_annotation.selector).equals(annotation.selector)
          expect(_annotation.createdAt).to.exist
          expect(_annotation.updatedAt).to.exist
        })
      })

      it('Get annotations with non existent snapshotId should fail', async function () {
        const response = await request(app).get(
          '/v1/snapshots/61b7284ded4084fd77ced9bb/annotations'
        )

        expect(response.status).equals(404)
        expect(response.body.message).equals('Snapshot not found!')
      })
    })

    describe('PATCH Annotation', function () {
      it('Patch annotation successfully', async function () {
        // Arrange
        const savedAnnotation = await snapshot.addAnnotation(
          annotation.title,
          annotation.description,
          annotation.selector,
          annotation.successCriterium
        )

        const editedValues = {
          title: 'edited title',
          description: 'edited description',
          selector: '.dummy-selector',
          successCriterium: {
            successCriteriumId: 'WCAG2:audio-only-and-video-only-prerecorded',
            num: '1.2.1',
            level: 'A',
            handle: 'Audio-only and Video-only (Prerecorded)',
            title:
              'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:',
            details: [
              {
                type: 'ulist',
                items: [
                  {
                    handle: 'Prerecorded Audio-only',
                    text: 'An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content.',
                  },
                  {
                    handle: 'Prerecorded Video-only',
                    text: 'Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
                  },
                ],
              },
            ],
          },
        }

        // Act
        const response = await request(app)
          .patch(`/v1/snapshots/${snapshot._id.toString()}/annotations/${savedAnnotation._id}`)
          .send({
            title: editedValues.title,
            description: editedValues.description,
            selector: editedValues.selector,
            successCriterium: editedValues.successCriterium,
          })

        // Assert
        expect(response.status).equals(200)
        expect(response.body._id.toString()).equals(savedAnnotation._id.toString())
        expect(response.body.title).equals(editedValues.title)
        expect(response.body.description).equals(editedValues.description)
        expect(response.body.successCriterium.successCriteriumId).equals(
          editedValues.successCriterium.successCriteriumId
        )
      })

      it('Patch annotation without any fields should fail', async function () {
        // Arrange
        const savedAnnotation = await snapshot.addAnnotation(
          annotation.title,
          annotation.description,
          annotation.selector,
          annotation.successCriterium
        )

        // Act
        const response = await request(app).patch(
          `/v1/snapshots/${snapshot._id.toString()}/annotations/${savedAnnotation._id.toString()}`
        )

        // Assert
        expect(response.status).equals(400)
        expect(response.body.message).equals('Invalid patch parameters!')
      })
    })

    describe('DELETE Annotation', function () {
      it('Delete annotation successfully', async function () {
        // Arrange
        const savedAnnotation = await snapshot.addAnnotation(
          annotation.title,
          annotation.description,
          annotation.selector,
          annotation.successCriterium
        )

        // Act
        const response = await request(app).delete(
          `/v1/snapshots/${snapshot._id.toString()}/annotations/${savedAnnotation._id.toString()}`
        )

        // Assert
        expect(response.status).equals(200)
        expect(response.body._id).equals(savedAnnotation._id.toString())
        expect(response.body.title).equals(savedAnnotation.title)
        expect(response.body.description).equals(savedAnnotation.description)
        expect(response.body.selector).equals(savedAnnotation.selector)
      })

      it('Delete annotation with non existent snapshotid should fail', async function () {
        // Act
        const response = await request(app).delete(
          `/v1/snapshots/507f1f77bcf86cd799439011/annotations/fake-annotation-id`
        )

        // Assert
        expect(response.status).equals(404)
        expect(response.body.message).equals('Snapshot not found!')
      })

      it('Delete annotation with non existent annotationId should fail', async function () {
        // Act
        const response = await request(app).delete(
          `/v1/snapshots/${snapshot._id.toString()}/annotations/507f1f77bcf86cd799439011`
        )

        // Assert
        expect(response.status).equals(404)
        expect(response.body.message).equals('Annotation not found!')
      })
    })
  })
})
