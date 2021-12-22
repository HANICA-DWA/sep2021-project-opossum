const fs = require('fs')
const path = require('path')

fs.copyFile(
  path.join(__dirname, 'node_modules', 'axe-core', 'axe.min.js'),
  path.join(__dirname, 'dist', 'js', 'axe.min.js'),
  (err) => {
    if (err) throw err
    console.log('node_modules/axe-core/axe-core.min.js was copied to dist/js/axe.min.js')
  }
)
