

/* global globalThis */

import * as processors from './processors/index.js'
import * as vendor from './vendor/index.js'
import * as modules from './modules/index.js'
import * as core from './single-file-core.js'
import * as helper from './single-file-helper.js'
import * as util from './single-file-util.js'

let SingleFile
export { init, getPageData, processors, vendor, modules, helper, SingleFile }

function init(initOptions) {
  SingleFile = core.getClass(util.getInstance(initOptions), vendor.cssTree)
}

async function getPageData(options = {}, initOptions, doc = globalThis.document, win = globalThis) {
  const frames = processors.frameTree
  let framesSessionId
  init(initOptions)
  if (doc && win) {
    helper.initDoc(doc)
    const preInitializationPromises = []
    if (!options.saveRawPage) {
      if (!options.removeFrames && frames && globalThis.frames && globalThis.frames.length) {
        let frameTreePromise
        if (options.loadDeferredImages) {
          frameTreePromise = new Promise((resolve) =>
            globalThis.setTimeout(
              () => resolve(frames.getAsync(options)),
              options.loadDeferredImagesMaxIdleTime - frames.TIMEOUT_INIT_REQUEST_MESSAGE
            )
          )
        } else {
          frameTreePromise = frames.getAsync(options)
        }
        preInitializationPromises.push(frameTreePromise)
      }
      if (options.loadDeferredImages) {
        preInitializationPromises.push(processors.lazy.process(options))
      }
    }
    ;[options.frames] = await Promise.all(preInitializationPromises)
    framesSessionId = options.frames && options.frames.sessionId
  }
  options.doc = doc
  options.win = win
  options.insertCanonicalLink = true
  options.onprogress = (event) => {
    if (event.type === event.RESOURCES_INITIALIZED && doc && win && options.loadDeferredImages) {
      processors.lazy.resetZoomLevel(options)
    }
  }
  const processor = new SingleFile(options)
  await processor.run()
  if (framesSessionId) {
    frames.cleanup(framesSessionId)
  }
  return await processor.getPageData()
}
