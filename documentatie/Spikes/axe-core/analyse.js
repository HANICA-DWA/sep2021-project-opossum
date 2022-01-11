// const axe = require('axe-core')

async function analyse() {
  const results = await axe.run()
  return results.violations
}
