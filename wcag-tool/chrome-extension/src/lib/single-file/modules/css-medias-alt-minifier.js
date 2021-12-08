

import * as cssTree from '../vendor/css-tree.js'
import * as mediaQueryParser from '../vendor/css-media-query-parser.js'
import { flatten } from '../single-file-helper.js'

const helper = {
  flatten,
}

const MEDIA_ALL = 'all'
const MEDIA_SCREEN = 'screen'

export { process }

function process(stylesheets) {
  const stats = { processed: 0, discarded: 0 }
  stylesheets.forEach((stylesheetInfo, element) => {
    if (
      matchesMediaType(stylesheetInfo.mediaText || MEDIA_ALL, MEDIA_SCREEN) &&
      stylesheetInfo.stylesheet.children
    ) {
      const removedRules = processRules(stylesheetInfo.stylesheet.children, stats)
      removedRules.forEach(({ cssRules, cssRule }) => cssRules.remove(cssRule))
    } else {
      stylesheets.delete(element)
    }
  })
  return stats
}

function processRules(cssRules, stats, removedRules = []) {
  for (let cssRule = cssRules.head; cssRule; cssRule = cssRule.next) {
    const ruleData = cssRule.data
    if (
      ruleData.type == 'Atrule' &&
      ruleData.name == 'media' &&
      ruleData.block &&
      ruleData.block.children &&
      ruleData.prelude &&
      ruleData.prelude.children
    ) {
      stats.processed++
      if (matchesMediaType(cssTree.generate(ruleData.prelude), MEDIA_SCREEN)) {
        processRules(ruleData.block.children, stats, removedRules)
      } else {
        removedRules.push({ cssRules, cssRule })
        stats.discarded++
      }
    }
  }
  return removedRules
}

function matchesMediaType(mediaText, mediaType) {
  const foundMediaTypes = helper.flatten(
    mediaQueryParser.parseMediaList(mediaText).map((node) => getMediaTypes(node, mediaType))
  )
  return foundMediaTypes.find(
    (mediaTypeInfo) =>
      (!mediaTypeInfo.not &&
        (mediaTypeInfo.value == mediaType || mediaTypeInfo.value == MEDIA_ALL)) ||
      (mediaTypeInfo.not && (mediaTypeInfo.value == MEDIA_ALL || mediaTypeInfo.value != mediaType))
  )
}

function getMediaTypes(parentNode, mediaType, mediaTypes = []) {
  parentNode.nodes.map((node, indexNode) => {
    if (node.type == 'media-query') {
      return getMediaTypes(node, mediaType, mediaTypes)
    }
    if (node.type == 'media-type') {
      const nodeMediaType = {
        not: Boolean(
          indexNode && parentNode.nodes[0].type == 'keyword' && parentNode.nodes[0].value == 'not'
        ),
        value: node.value,
      }
      if (
        !mediaTypes.find(
          (mediaType) =>
            nodeMediaType.not == mediaType.not && nodeMediaType.value == mediaType.value
        )
      ) {
        mediaTypes.push(nodeMediaType)
      }
    }
  })
  if (!mediaTypes.length) {
    mediaTypes.push({ not: false, value: MEDIA_ALL })
  }
  return mediaTypes
}
