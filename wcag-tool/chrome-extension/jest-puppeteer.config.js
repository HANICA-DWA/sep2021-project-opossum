module.exports = {
  launch: {
    headless: false,
    defaultViewport: null,
    args: [
      '--disable-extensions-except=../../../../../dist/',
      '--load-extension=../../../../../dist/',
    ],
  },
}
