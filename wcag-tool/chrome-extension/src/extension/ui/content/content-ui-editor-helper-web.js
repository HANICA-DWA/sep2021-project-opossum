

import * as serializer from '../../../lib/single-file/modules/html-serializer.js'

const helper = {
  serialize(doc, compressHTML) {
    return serializer.process(doc, compressHTML)
  },
}

export { helper }
