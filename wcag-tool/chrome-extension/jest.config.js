// Sync object
/** @type {import("@jest/types").Config.InitialOptions} */
const config = {
  rootDir: 'tests',
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['expect-puppeteer'],
  testTimeout: 60000,
}

module.exports = config
