const { annotationRouter } = require('./annotation.routes')
const { snapshotRouter } = require('./snapshot.routes')
const { wcagRouter } = require('./wcag.routes')

module.exports = {
  annotationRouter,
  snapshotRouter,
  wcagRouter,
}
