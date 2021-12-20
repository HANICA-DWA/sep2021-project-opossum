/* eslint-disable no-console */
const mongoose = require('mongoose')
const axios = require('axios')
const { Principle, Guideline, SuccessCriterium, Snapshot } = require('../models')

const print = (string, object = '') => {
  if (process.env.NODE_ENV !== 'test') console.log(string, object)
}

exports.seedWCAG = async () => {
  print(`\nSeeding ${process.env.NODE_ENV} database with WCAG data:`)

  // Drop collection
  print('\tStep 1: Deleting existing Principles, Guidelines and SuccessCriteria...')
  try {
    await Promise.all([
      Principle.collection.drop(),
      Guideline.collection.drop(),
      SuccessCriterium.collection.drop(),
    ])

    print('\t\tok!')

    // eslint-disable-next-line no-empty
  } catch (err) {
    print('\t\terror!', err.message)
  }

  // Download official wcag quick reference
  print('\tStep 2: Downloading wcag data from official source...')
  let data
  try {
    data = (
      await axios.get(
        'https://raw.githubusercontent.com/w3c/wai-wcag-quickref/gh-pages/_data/wcag21.json'
      )
    ).data
    print('\t\tok!')
  } catch (err) {
    print('\t\terror!', err.message)
    return 1
  }

  // Map data to principles, guidelines and success criteria
  print('\tStep 3: Mapping official wcag data to mongoose models...')
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
  print('\t\tok!')

  // Saving all docs
  print(`\tStep 4: Saving all mongoose models to ${process.env.NODE_ENV} database...`)
  print(`\t\tsaving principles...`)
  try {
    await Principle.insertMany(principles)
    print('\t\tok!')
  } catch (err) {
    if (err.code === 11000) {
      print('\t\terror! principle already exists!') // MongoDB Duplicate key error
    } else {
      print('\t\terror! saving principles:', err)
    }
  }

  print(`\t\tsaving guidelines...`)
  try {
    await Guideline.insertMany(guidelines)
    print('\t\tok!')
  } catch (err) {
    if (err.code === 11000) {
      print('\t\terror! guideline already exists!') // MongoDB Duplicate key error
    } else {
      print('\t\terror! saving guidelines:', err)
    }
  }

  print(`\t\tsaving success criteria...`)
  try {
    await SuccessCriterium.insertMany(successCriteria)
    print('\t\tok!')
  } catch (err) {
    if (err.code === 11000) {
      print('\t\terror! success criterium already exists!') // MongoDB Duplicate key error
    } else {
      print('\t\terror! saving success criteria:', err)
    }
  }

  print(`\nSeeding ${process.env.NODE_ENV} database with wcag data finished! Goodbye!\n`)

  return 0
}

exports.seedSnapshots = async () => {
  print(`\nSeeding ${process.env.NODE_ENV} database with 10 dummy snapshots`)

  print('\tStep 1: Create 10 dummy snapshots...')
  const dummySnapshots = []

  for (let i = 0; i < 10; i += 1)
    dummySnapshots.push(
      new Snapshot({
        name: `Dummy snaphot ${i}`,
        domain: 'test.com',
        filename: `dummy-snapshot-file-${i}`,
      })
    )
  print('\tok!')

  print(`\tStep 2: Saving all dummy snapshot to ${process.env.NODE_ENV} database...`)
  try {
    await Snapshot.insertMany(dummySnapshots)
    print('\tok!')
  } catch (err) {
    if (err.code === 11000) {
      print('\terror! snapshot already exists!') // MongoDB Duplicate key error
    } else {
      print('\terror! saving snapshots:', err)
    }
  }

  print(`\nSeeding ${process.env.NODE_ENV} with dummy snapshots finished! Goodbye!\n`)

  return 0
}

exports.main = async () => {
  // Connect to MongoDB
  print('\nConnecting to MongoDB...')
  await mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw new Error('Could not connect to MongoDB!')
    }
  )
  print('ok!')

  // Seed database
  await this.seedWCAG()

  process.exit(0)
}
