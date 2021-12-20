const { Snapshot, Annotation, SuccessCriterium, Principle, Guideline } = require('../src/models')

exports.principle = () =>
  new Principle({
    principleId: 'WCAG2:perceivable',
    num: '1',
    handle: 'Perceivable',
    title:
      'Information and user interface components must be presentable to users in ways they can perceive.',
  })

exports.guideline = () =>
  new Guideline({
    guidelineId: 'WCAG2:text-alternatives',
    num: '1.1',
    handle: 'Text Alternatives',
    title:
      'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.',
  })

exports.successCriterium = () =>
  new SuccessCriterium({
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
  })

exports.annotation = () =>
  new Annotation({
    successCriterium: this.successCriterium(),
    title: 'Dummy annotation',
    description: 'Dummy description',
    selector: '.dummy-selector',
  })

exports.snapshot = () =>
  new Snapshot({
    name: 'Dummy snapshot',
    domain: 'test.com',
    filename: 'dummyfile',
  })
