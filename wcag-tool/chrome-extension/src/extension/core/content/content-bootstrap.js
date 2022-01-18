

/* global browser, globalThis, document, location, prompt, Node */

const singlefile = globalThis.singlefileBootstrap

const MAX_CONTENT_SIZE = 32 * (1024 * 1024)

let options
let previousLocationHref
singlefile.pageInfo = {
  updatedResources: {},
  visitDate: new Date(),
}
browser.runtime.sendMessage({ method: 'bootstrap.init' }).then((message) => {
  options = message.options
  singlefile.messages = message.messages
  if (options && options.autoOpenEditor && detectSavedPage(document)) {
    if (document.readyState == 'loading') {
      document.addEventListener('DOMContentLoaded', () => openEditor(document))
    } else {
      openEditor(document)
    }
  }
})
browser.runtime.onMessage.addListener((message) => {
  if (
    message.method == 'content.maybeInit' ||
    message.method == 'content.init' ||
    message.method == 'content.openEditor' ||
    message.method == 'devtools.resourceCommitted' ||
    message.method == 'common.promptValueRequest'
  ) {
    return onMessage(message)
  }
})
document.addEventListener('DOMContentLoaded', init, false)

async function onMessage(message) {
  if (message.method == 'content.maybeInit') {
    init()
    return {}
  }
  if (message.method == 'content.init') {
    options = message.options
    return {}
  }
  if (message.method == 'content.openEditor') {
    if (detectSavedPage(document)) {
      openEditor(document)
    }
    return {}
  }
  if (message.method == 'devtools.resourceCommitted') {
    singlefile.pageInfo.updatedResources[message.url] = {
      content: message.content,
      type: message.type,
      encoding: message.encoding,
    }
    return {}
  }
  if (message.method == 'common.promptValueRequest') {
    browser.runtime.sendMessage({
      method: 'tabs.promptValueResponse',
      value: prompt(`SingleFile Lite: ${message.promptMessage}`),
    })
    return {}
  }
}

function init() {
  if (previousLocationHref != location.href && !singlefile.pageInfo.processing) {
    previousLocationHref = location.href
    browser.runtime
      .sendMessage({ method: 'tabs.init', savedPageDetected: detectSavedPage(document) })
      .catch(() => {})
    browser.runtime.sendMessage({ method: 'ui.processInit' }).catch(() => {})
  }
}

async function openEditor(document) {
  const infobarElement = document.querySelector('singlefile-infobar')
  if (infobarElement) {
    infobarElement.remove()
  }
  serializeShadowRoots(document)
  const content = singlefile.helper.serialize(document)
  for (let blockIndex = 0; blockIndex * MAX_CONTENT_SIZE < content.length; blockIndex++) {
    const message = {
      method: 'editor.open',
      filename: decodeURIComponent(location.href.match(/^.*\/(.*)$/)[1]),
    }
    message.truncated = content.length > MAX_CONTENT_SIZE
    if (message.truncated) {
      message.finished = (blockIndex + 1) * MAX_CONTENT_SIZE > content.length
      message.content = content.substring(
        blockIndex * MAX_CONTENT_SIZE,
        (blockIndex + 1) * MAX_CONTENT_SIZE
      )
    } else {
      message.content = content
    }
    await browser.runtime.sendMessage(message)
  }
}

function detectSavedPage(document) {
  const { helper } = singlefile
  const firstDocumentChild = document.documentElement.firstChild
  return (
    firstDocumentChild.nodeType == Node.COMMENT_NODE &&
    (firstDocumentChild.textContent.includes(helper.COMMENT_HEADER) ||
      firstDocumentChild.textContent.includes('--'))
  )
}

function serializeShadowRoots(node) {
  const SHADOW_MODE_ATTRIBUTE_NAME = 'shadowmode'
  node.querySelectorAll('*').forEach((element) => {
    const shadowRoot = singlefile.helper.getShadowRoot(element)
    if (shadowRoot) {
      serializeShadowRoots(shadowRoot)
      const templateElement = document.createElement('template')
      templateElement.setAttribute(SHADOW_MODE_ATTRIBUTE_NAME, 'open')
      templateElement.appendChild(shadowRoot)
      element.appendChild(templateElement)
    }
  })
}
