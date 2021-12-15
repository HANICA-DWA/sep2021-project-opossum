/* eslint-disable func-names, prefer-arrow-callback,no-unused-expressions */
const chai = require('chai')
const chaiHttp = require('chai-http')
const { app } = require('../../src/app')
const setup = require('./setup')
const { Snapshot, Annotation, SuccessCriterium } = require('../../src/models')

chai.use(chaiHttp)
const { expect, request } = chai

describe('Annotation Endpoints', function () {
  let dummySnapshot
  const dummySuccessCriterium = {
    _id: '61b9f17dc7208e0d6c24e069',
    successCriteriumId: 'WCAG2:non-text-content',
    num: '1.1.1',
    level: 'A',
    handle: 'Non-text Content',
    title:
      'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
    details: [
      {
        type: 'ulist',
        items: [
          {
            handle: 'Controls, Input',
            text: 'If non-text content is a control or accepts user input, then it has a name that describes its purpose. (Refer to Success Criterion 4.1.2 for additional requirements for controls and content that accepts user input.)',
          },
          {
            handle: 'Time-Based Media',
            text: 'If non-text content is time-based media, then text alternatives at least provide descriptive identification of the non-text content. (Refer to Guideline 1.2 for additional requirements for media.)',
          },
          {
            handle: 'Test',
            text: 'If non-text content is a test or exercise that would be invalid if presented in text, then text alternatives at least provide descriptive identification of the non-text content.',
          },
          {
            handle: 'Sensory',
            text: 'If non-text content is primarily intended to create a specific sensory experience, then text alternatives at least provide descriptive identification of the non-text content.',
          },
          {
            handle: 'CAPTCHA',
            text: 'If the purpose of non-text content is to confirm that content is being accessed by a person rather than a computer, then text alternatives that identify and describe the purpose of the non-text content are provided, and alternative forms of CAPTCHA using output modes for different types of sensory perception are provided to accommodate different disabilities.',
          },
          {
            handle: 'Decoration, Formatting, Invisible',
            text: 'If non-text content is pure decoration, is used only for visual formatting, or is not presented to users, then it is implemented in a way that it can be ignored by assistive technology.',
          },
        ],
      },
    ],
    techniques: [],
  }
  const dummyAnnotation = {
    successCriterium: dummySuccessCriterium,
    title: 'Dummy title',
    description: 'Dummy description',
    selector: '.dummy-selector',
  }

  before(async function () {
    await setup.before()

    dummySnapshot = await new Snapshot({
      name: 'dummy snapshot',
      domain: 'test.com',
      filename: 'dummyfile',
    }).save()
  })

  after(async function () {
    await setup.after()
  })

  afterEach(async function () {
    setup.afterEach()

    dummySnapshot = await new Snapshot({
      name: 'dummy snapshot',
      domain: 'test.com',
      filename: 'dummyfile',
    }).save()
  })

  describe('Annotation Endpoints', function () {
    describe('POST Annotation', function () {
      it('Post annotation successfully', async function () {
        const response = await request(app)
          .post(`/v1/snapshots/${dummySnapshot._id}/annotations`)
          .send({
            successCriterium: dummyAnnotation.successCriterium,
            title: dummyAnnotation.title,
            description: dummyAnnotation.description,
            selector: dummyAnnotation.selector,
          })

        expect(response.status).equals(201)
        expect(response.body._id).to.exist
        expect(response.body.title).equals(dummyAnnotation.title)
        expect(response.body.description).equals(dummyAnnotation.description)
        expect(response.body.selector).equals(dummyAnnotation.selector)
        expect(response.body.successCriterium).deep.equals(dummySuccessCriterium)
      })

      it('Post annotation with invalid success criterium should fail', async function () {
        const response = await request(app)
          .post(`/v1/snapshots/${dummySnapshot._id}/annotations`)
          .send({
            successCriterium: {
              foo: 'bar',
            },
            title: dummyAnnotation.title,
            description: dummyAnnotation.description,
            selector: dummyAnnotation.selector,
          })
        expect(response.status).equals(400)
      })

      it('Post annotation without required fields should fail', async function () {
        const response = await request(app).post(`/v1/snapshots/${dummySnapshot._id}/annotations`)

        expect(response.status).equals(400)
      })
    })

    describe('GET Annotation', function () {
      it('Get annotations successfully', async function () {
        await dummySnapshot.addAnnotation(
          dummyAnnotation.title,
          dummyAnnotation.description,
          dummyAnnotation.selector
        )
        await dummySnapshot.addAnnotation(
          dummyAnnotation.title,
          dummyAnnotation.description,
          dummyAnnotation.selector
        )
        await dummySnapshot.addAnnotation(
          dummyAnnotation.title,
          dummyAnnotation.description,
          dummyAnnotation.selector
        )

        const response = await request(app).get(`/v1/snapshots/${dummySnapshot._id}/annotations`)

        expect(response.status).equals(200)
        expect(response.body.length).equals(3)
        response.body.forEach((annotation) => {
          expect(annotation._id).to.exist
          expect(annotation.title).equals(dummyAnnotation.title)
          expect(annotation.description).equals(dummyAnnotation.description)
          expect(annotation.selector).equals(dummyAnnotation.selector)
          expect(annotation.createdAt).to.exist
          expect(annotation.updatedAt).to.exist
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
        const annotation = await dummySnapshot.addAnnotation(
          dummyAnnotation.title,
          dummyAnnotation.description,
          dummyAnnotation.selector
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

        const response = await request(app)
          .patch(`/v1/snapshots/${dummySnapshot._id}/annotations/${annotation._id}`)
          .send({
            title: editedValues.title,
            description: editedValues.description,
            selector: editedValues.selector,
            successCriterium: editedValues.successCriterium,
          })

        expect(response.status).equals(200)
        expect(response.body._id).equals(annotation._id.toString())
        expect(response.body.title).equals(editedValues.title)
        expect(response.body.description).equals(editedValues.description)
        expect(response.body.successCriterium.successCriteriumId).equals(
          editedValues.successCriterium.successCriteriumId
        )
      })

      it('Patch annotation without any fields should fail', async function () {
        const annotation = await dummySnapshot.addAnnotation(
          dummyAnnotation.title,
          dummyAnnotation.description,
          dummyAnnotation.selector
        )

        const response = await request(app).patch(
          `/v1/snapshots/${dummySnapshot._id}/annotations/${annotation._id}`
        )

        expect(response.status).equals(400)
        expect(response.body.message).equals('Invalid patch parameters!')
      })
    })

    describe('DELETE Annotation', function () {
      it('Delete annotation successfully', async function () {
        const annotation = await dummySnapshot.addAnnotation(
          dummyAnnotation.title,
          dummyAnnotation.description,
          dummyAnnotation.selector
        )

        const response = await request(app).delete(
          `/v1/snapshots/${dummySnapshot._id}/annotations/${annotation._id}`
        )

        expect(response.status).equals(200)
        expect(response.body._id).equals(annotation._id.toString())
        expect(response.body.title).equals(annotation.title)
        expect(response.body.description).equals(annotation.description)
        expect(response.body.selector).equals(annotation.selector)
      })

      it('Delete annotation with non existent snapshotid should fail', async function () {
        const annotation = await dummySnapshot.addAnnotation(
          dummyAnnotation.title,
          dummyAnnotation.description,
          dummyAnnotation.selector
        )

        const response = await request(app).delete(
          `/v1/snapshots/61b889835c9644ffe3ec32f9/annotations/${annotation._id}`
        )

        expect(response.status).equals(404)
        expect(response.body.message).equals('Snapshot not found!')
      })

      it('Delete annotation with non existent annotationId should fail', async function () {
        const response = await request(app).delete(
          `/v1/snapshots/${dummySnapshot._id}/annotations/61b889835c9644ffe3ec32f9`
        )

        expect(response.status).equals(404)
        expect(response.body.message).equals('Annotation not found!')
      })
    })
  })
})
