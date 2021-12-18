/* eslint-disable no-console */
require('dotenv').config()

const mongoose = require('mongoose')
const axios = require('axios')
const { Principle, Guideline, SuccessCriterium, Snapshot } = require('../models')

exports.seedWCAG = async () => {
  // Drop collection
  try {
    await Promise.all([
      Principle.collection.drop(),
      Guideline.collection.drop(),
      SuccessCriterium.collection.drop(),
    ])
    // eslint-disable-next-line no-empty
  } catch (err) {}

  // Download official wcag quick reference
  let data
  try {
    data = (
      await axios.get(
        'https://raw.githubusercontent.com/w3c/wai-wcag-quickref/gh-pages/_data/wcag21.json'
      )
    ).data
  } catch (err) {
    console.log('error downloading wcag rules', err)
    return 1
  }

  // Map data to principles, guidelines and success criteria
  const principles = []
  const guidelines = []
  const successCriteria = []

  let currentPrinciple
  let currentGuideline
  Object.values(data)[0].forEach((_principle) => {
    // Principle
    currentPrinciple = new Principle({
      principleId: _principle.id,
      num: _principle.num,
      handle: _principle.handle,
      title: _principle.title,
    })

    principles.push(currentPrinciple)

    _principle.guidelines.forEach((_guideline) => {
      currentGuideline = new Guideline({
        guidelineId: _guideline.id,
        num: _guideline.num,
        handle: _guideline.handle,
        title: _guideline.title,
        techniques: _guideline.techniques,
      })

      guidelines.push(currentGuideline)

      _guideline.successcriteria.forEach((_successCriterium) => {
        successCriteria.push(
          new SuccessCriterium({
            principle: currentPrinciple,
            guideline: currentGuideline,
            successCriteriumId: _successCriterium.id,
            num: _successCriterium.num,
            level: _successCriterium.level,
            handle: _successCriterium.handle,
            title: _successCriterium.title,
            details: _successCriterium.details,
            techniques: _successCriterium.techniques,
          })
        )
      })

      currentGuideline = undefined
    })

    currentPrinciple = undefined
  })

  // Saving all docs
  try {
    await Principle.insertMany(principles)
  } catch (err) {
    if (err.code === 11000) {
      console.log('error: principle already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving principles:', err)
    }
  }

  try {
    await Guideline.insertMany(guidelines)
  } catch (err) {
    if (err.code === 11000) {
      console.log('error: guideline already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving guidelines:', err)
    }
  }

  try {
    await SuccessCriterium.insertMany(successCriteria)
  } catch (err) {
    if (err.code === 11000) {
      console.log('error: success criterium already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving success criteria:', err)
    }
  }

  return 0
}

exports.seedSnapshots = async () => {
  const dummySnapshots = []

  for (let i = 0; i < 10; i += 1)
    dummySnapshots.push(
      new Snapshot({
        name: `Dummy snaphot ${i}`,
        domain: 'test.com',
        filename: `dummy-snapshot-file-${i}`,
      })
    )

  try {
    await Snapshot.insertMany(dummySnapshots)
  } catch (err) {
    if (err.code === 11000) {
      console.log('Error: snapshot already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving snapshots:', err)
    }
  }

  return 0
}

exports.main = async () => {
  // Connect to MongoDB
  console.log('\nConnecting to MongoDB...')
  await mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw new Error('Could not connect to MongoDB!')
    }
  )
  console.log('ok!')

  // Seed database
  console.log('\nSeeding database with WCAG')
  await this.seedWCAG()
  console.log('ok!')

  process.exit(0)
}
