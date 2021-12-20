module.exports = {
  launch: {
    // *useful for debugging*
    // headless: false,
    // defaultViewport: null,
    args: [
      '--disable-extensions-except=../../../../../dist/',
      '--load-extension=../../../../../dist/',
    ],
  },
}
