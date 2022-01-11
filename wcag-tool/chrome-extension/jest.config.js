// Sync object
/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  rootDir: 'tests',
  preset: 'jest-puppeteer',
  testTimeout: 1000000,
}

module.exports = config
