/* global globalThis, window, document, fetch, DOMParser, getComputedStyle, setTimeout, clearTimeout, NodeFilter, Readability, isProbablyReaderable, matchMedia, TextDecoder, Node */

import unique from '../../../../node_modules/unique-selector/src/index.js'
;(() => {
  const NOTE_TAGNAME = 'single-file-note'
  const NOTE_MASK_CLASS = 'note-mask'
  const NOTE_MASK_MOVING_CLASS = 'note-mask-moving'
  const PAGE_MASK_CLASS = 'page-mask'
  const MASK_CLASS = 'single-file-mask'
  const PAGE_MASK_CONTAINER_CLASS = 'single-file-page-mask'
  const PAGE_MASK_ACTIVE_CLASS = 'page-mask-active'
  const DISABLED_NOSCRIPT_ATTRIBUTE_NAME = 'data-single-file-disabled-noscript'
  const COMMENT_HEADER = 'Snapshot WCAG Tool'

  let MASK_WEB_STYLESHEET
  let HIGHLIGHTS_WEB_STYLESHEET
  let anchorElement
  let maskNoteElement
  let maskPageElement
  let initScriptContent

  window.onmessage = async (event) => {
    const message = JSON.parse(event.data)
    if (message.method === 'init') {
      await init(message.content)
    }
    if (message.method === 'elementSelectionMode') {
      elementSelectionMode(message.content)
    }
    if (message.method === 'highlightElement') {
      highlightElement(message.content)
    }
    if (message.method === 'analyse') {
      analyse(event)
    }
    return {}
  }

  document.ondragover = (event) => event.preventDefault()

  document.ondrop = async (event) => {
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      event.preventDefault()
      const content = new TextDecoder().decode(await file.arrayBuffer())
      await init(content, { filename: file.name })
    }
  }

  async function analyse(event) {
    try {
      axe.configure({
        allowedOrigins: ['<unsafe_all_origins>'],
      })
      const result = await axe.run()
      if (!result) throw new Error('No results!')

      event.source.postMessage(JSON.stringify({ method: 'onAnalyse', data: result }), '*')
    } catch (error) {
      event.source.postMessage(JSON.stringify({ method: 'onAnalyseError', data: error }), '*')
    }
  }

  async function init(content, { filename, reset } = {}) {
    await initConstants()
    const initScriptContentMatch = content.match(/<script data-template-shadow-root.*<\/script>/)
    if (initScriptContentMatch && initScriptContentMatch[0]) {
      initScriptContent = initScriptContentMatch[0]
    }
    content = content.replace(
      /<script data-template-shadow-root.*<\/script>/g,
      "<script data-template-shadow-root src='/single-file/web/editor/editor-init-web.js'></script>"
    )
    const contentDocument = new DOMParser().parseFromString(content, 'text/html')
    if (detectSavedPage(contentDocument)) {
      if (contentDocument.doctype) {
        if (document.doctype) {
          document.replaceChild(contentDocument.doctype, document.doctype)
        } else {
          document.insertBefore(contentDocument.doctype, document.documentElement)
        }
      } else {
        document.doctype.remove()
      }
      contentDocument.querySelectorAll('noscript').forEach((element) => {
        element.setAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME, element.innerHTML)
        element.textContent = ''
      })
      contentDocument.querySelectorAll('iframe').forEach((element) => {
        const pointerEvents = 'pointer-events'
        element.style.setProperty(
          `-sf-${pointerEvents}`,
          element.style.getPropertyValue(pointerEvents),
          element.style.getPropertyPriority(pointerEvents)
        )
        element.style.setProperty(pointerEvents, 'none', 'important')
      })
      document.replaceChild(contentDocument.documentElement, document.documentElement)
      document.documentElement.appendChild(getStyleElement(HIGHLIGHTS_WEB_STYLESHEET))
      maskPageElement = getMaskElement(PAGE_MASK_CLASS, PAGE_MASK_CONTAINER_CLASS)
      maskNoteElement = getMaskElement(NOTE_MASK_CLASS)
      window.onclick = (event) => event.preventDefault()
      const iconElement = document.querySelector('link[rel*=icon]')
      window.parent.postMessage(
        JSON.stringify({
          method: 'onInit',
          title: document.title,
          icon: iconElement && iconElement.href,
          filename,
          reset,
          formatPageEnabled: isProbablyReaderable(document),
        }),
        '*'
      )
    }
  }

  async function initConstants() {
    ;[MASK_WEB_STYLESHEET] = await Promise.all([
      minifyText(await (await fetch('/extension/ui/content/editor-mask-web.css')).text()),
    ])
  }

  const SELECT_PX_THRESHOLD = 4
  const COLOR = 'note-green'

  const elementSelectionMode = (payload) => {
    if (payload) {
      document.documentElement.onmousemove = (event) => {
        maskPageElement.classList.add(PAGE_MASK_ACTIVE_CLASS)
        document.documentElement.style.setProperty('user-select', 'none', 'important')
        const { clientX, clientY } = getPosition(event)
        anchorElement = getTarget(clientX, clientY) || document.documentElement
        displayMaskNote()
      }
      document.addEventListener('scroll', displayMaskNote)

      document.documentElement.onclick = () => {
        window.parent.postMessage(
          JSON.stringify({ method: 'onElementSelected', content: unique(anchorElement) }),
          '*'
        )
      }
    } else {
      document.documentElement.onclick = null
      document.documentElement.onmousemove = null
      document.removeEventListener('scroll', displayMaskNote)
      hideMaskNote()
      anchorElement = null
      document.documentElement.style.removeProperty('user-select')
      maskPageElement.classList.remove(PAGE_MASK_ACTIVE_CLASS)
    }
  }

  const highlightElement = (selector) => {
    if (!isBlank(selector)) {
      anchorElement = document.querySelector(selector)
      if (anchorElement) {
        displayMaskNote()
        document.addEventListener('scroll', displayMaskNote)
        window.addEventListener('resize', displayMaskNote)
        return
      }
    }

    document.removeEventListener('scroll', displayMaskNote)
    window.removeEventListener('resize', displayMaskNote)
    anchorElement = null
    hideMaskNote()

    function isBlank(str) {
      return !str || /^\s*$/.test(str)
    }
  }

  function displayMaskNote() {
    if (anchorElement === document.documentElement || anchorElement === document.documentElement) {
      hideMaskNote()
    } else {
      const boundingRectAnchor = anchorElement.getBoundingClientRect()
      maskNoteElement.classList.add(NOTE_MASK_MOVING_CLASS)
      maskNoteElement.classList.add(COLOR)
      maskNoteElement.style.setProperty('top', `${boundingRectAnchor.y - 3}px`)
      maskNoteElement.style.setProperty('left', `${boundingRectAnchor.x - 3}px`)
      maskNoteElement.style.setProperty('width', `${boundingRectAnchor.width + 3}px`)
      maskNoteElement.style.setProperty('height', `${boundingRectAnchor.height + 3}px`)
    }
  }

  function hideMaskNote() {
    maskNoteElement.classList.remove(NOTE_MASK_MOVING_CLASS)
    maskNoteElement.classList.remove(COLOR)
  }

  function getTarget(clientX, clientY) {
    const targets = Array.from(document.elementsFromPoint(clientX, clientY)).filter((element) =>
      element.matches(`html *:not(${NOTE_TAGNAME}):not(.${MASK_CLASS})`)
    )
    if (!targets.includes(document.documentElement)) {
      targets.push(document.documentElement)
    }
    let newTarget
    let target = targets[0]
    let boundingRect = target.getBoundingClientRect()
    newTarget = determineTargetElement(
      'floor',
      target,
      clientX - boundingRect.left,
      getMatchedParents(target, 'left')
    )
    if (newTarget === target) {
      newTarget = determineTargetElement(
        'ceil',
        target,
        boundingRect.left + boundingRect.width - clientX,
        getMatchedParents(target, 'right')
      )
    }
    if (newTarget === target) {
      newTarget = determineTargetElement(
        'floor',
        target,
        clientY - boundingRect.top,
        getMatchedParents(target, 'top')
      )
    }
    if (newTarget === target) {
      newTarget = determineTargetElement(
        'ceil',
        target,
        boundingRect.top + boundingRect.height - clientY,
        getMatchedParents(target, 'bottom')
      )
    }
    target = newTarget
    while (
      // eslint-disable-next-line no-cond-assign
      ((boundingRect = target && target.getBoundingClientRect()),
      boundingRect &&
        boundingRect.width <= SELECT_PX_THRESHOLD &&
        boundingRect.height <= SELECT_PX_THRESHOLD)
    ) {
      target = target.parentElement
    }
    return target
  }

  function getMatchedParents(target, property) {
    let element = target
    let matchedParent
    const parents = []
    do {
      const boundingRect = element.getBoundingClientRect()
      if (
        element.parentElement &&
        !element.parentElement.tagName.toLowerCase() != NOTE_TAGNAME &&
        !element.classList.contains(MASK_CLASS)
      ) {
        const parentBoundingRect = element.parentElement.getBoundingClientRect()
        matchedParent =
          Math.abs(parentBoundingRect[property] - boundingRect[property]) <= SELECT_PX_THRESHOLD
        if (matchedParent) {
          if (
            element.parentElement.clientWidth > SELECT_PX_THRESHOLD &&
            element.parentElement.clientHeight > SELECT_PX_THRESHOLD &&
            (element.parentElement.clientWidth - element.clientWidth > SELECT_PX_THRESHOLD ||
              element.parentElement.clientHeight - element.clientHeight > SELECT_PX_THRESHOLD)
          ) {
            parents.push(element.parentElement)
          }
          element = element.parentElement
        }
      } else {
        matchedParent = false
      }
    } while (matchedParent && element)
    return parents
  }

  function determineTargetElement(roundingMethod, target, widthDistance, parents) {
    if (Math[roundingMethod](widthDistance / SELECT_PX_THRESHOLD) <= parents.length) {
      target =
        parents[parents.length - Math[roundingMethod](widthDistance / SELECT_PX_THRESHOLD) - 1]
    }
    return target
  }

  function getPosition(event) {
    if (event.touches && event.touches.length) {
      const touch = event.touches[0]
      return touch
    }
    return event
  }

  function getMaskElement(className, containerClassName) {
    let maskElement = document.documentElement.querySelector(`.${className}`)
    if (!maskElement) {
      maskElement = document.createElement('div')
      const maskContainerElement = document.createElement('div')
      if (containerClassName) {
        maskContainerElement.classList.add(containerClassName)
      }
      maskContainerElement.classList.add(MASK_CLASS)
      const firstNote = document.querySelector(NOTE_TAGNAME)
      if (firstNote && firstNote.parentElement == document.documentElement) {
        document.documentElement.insertBefore(maskContainerElement, firstNote)
      } else {
        document.documentElement.appendChild(maskContainerElement)
      }
      maskElement.classList.add(className)
      const maskShadow = maskContainerElement.attachShadow({ mode: 'open' })
      maskShadow.appendChild(getStyleElement(MASK_WEB_STYLESHEET))
      maskShadow.appendChild(maskElement)
      return maskElement
    }
    return false
  }

  function getStyleElement(stylesheet) {
    const linkElement = document.createElement('style')
    linkElement.textContent = stylesheet
    return linkElement
  }

  function minifyText(text) {
    return text.replace(/[\n\t\s]+/g, ' ')
  }

  function detectSavedPage(document) {
    const firstDocumentChild = document.documentElement.firstChild
    return (
      firstDocumentChild.nodeType == Node.COMMENT_NODE &&
      (firstDocumentChild.textContent.includes(COMMENT_HEADER) ||
        firstDocumentChild.textContent.includes('--'))
    )
  }
})()
