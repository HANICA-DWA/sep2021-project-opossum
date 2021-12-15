/* eslint-disable no-console */
require('dotenv').config()

const mongoose = require('mongoose')
const axios = require('axios')
const { Principle, Guideline, SuccessCriterium, Snapshot } = require('../models')

exports.seedWCAG = async () => {
  console.log('\nSeeding database with WCAG Principles, Guidelines and Success criteria!')
  // Drop collection
  console.log('\nDropping principle, guideline, success criterium collections...')
  try {
    await Promise.all([
      Principle.collection.drop(),
      Guideline.collection.drop(),
      SuccessCriterium.collection.drop(),
    ])
    console.log('ok!')
  } catch (err) {
    console.log('error:', err.message)
  }

  // Download official wcag quick reference
  console.log('\nDownloading official wcag 2.1 quick reference')
  let data
  try {
    data = (
      await axios.get(
        'https://raw.githubusercontent.com/w3c/wai-wcag-quickref/gh-pages/_data/wcag21.json'
      )
    ).data
    console.log('ok!')
  } catch (err) {
    console.log(err)
    return 1
  }

  // Map data to principles, guidelines and success criteria
  console.log('\nMapping data to Principle, Guideline and SuccessCriterium models...')
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
  console.log('ok!')

  // Saving all docs
  console.log('\nSaving all principles, guidelines and success criteria to MongoDB...')

  console.log('inserting principles...')
  try {
    await Principle.insertMany(principles)
    console.log('ok!')
  } catch (err) {
    if (err.code === 11000) {
      console.log('error: principle already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving principles:', err)
    }
  }

  console.log('inserting guidelines...')
  try {
    await Guideline.insertMany(guidelines)
    console.log('ok!')
  } catch (err) {
    if (err.code === 11000) {
      console.log('error: guideline already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving guidelines:', err)
    }
  }

  console.log('inserting success criteria...')
  try {
    await SuccessCriterium.insertMany(successCriteria)
    console.log('ok!')
  } catch (err) {
    if (err.code === 11000) {
      console.log('error: success criterium already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving success criteria:', err)
    }
  }

  console.log('\nDatabase seeded with WCAG! Bye!\n')
  return 0
}

exports.seedSnapshots = async () => {
  console.log('\nGenerating dummy snapshots...')
  const dummySnapshots = []

  for (let i = 1; i <= 10; i += 1)
    dummySnapshots.push(
      new Snapshot({
        name: `Dummy snaphot ${i}`,
        domain: 'test.com',
        filename: `dummy-snapshot-file-${i}`,
      })
    )
  console.log('ok!')

  console.log('\nInserting dummy snapshots...')
  try {
    await Snapshot.insertMany(dummySnapshots)
    console.log('ok!')
  } catch (err) {
    if (err.code === 11000) {
      console.log('error: snapshot already exists!') // MongoDB Duplicate key error
    } else {
      console.log('Error saving snapshots:', err)
    }
  }

  console.log('\nDatabase seeded with dummy snapshots! Bye!')
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
  await this.seedWCAG()

  process.exit(0)
}
