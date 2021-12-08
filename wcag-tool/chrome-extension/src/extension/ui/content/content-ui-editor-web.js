/* global globalThis, window, document, fetch, DOMParser, getComputedStyle, setTimeout, clearTimeout, NodeFilter, Readability, isProbablyReaderable, matchMedia, TextDecoder, Node */

import unique from '../../../../node_modules/unique-selector/src/index.js'

;((globalThis) => {
  const { singlefile } = globalThis

  const FORBIDDEN_TAG_NAMES = [
    'a',
    'area',
    'audio',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'iframe',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'video',
    'wbr',
  ]
  const SHADOW_MODE_ATTRIBUTE_NAME = 'shadowmode'
  const SHADOW_DELEGATE_FOCUS_ATTRIBUTE_NAME = 'delegatesfocus'
  const SCRIPT_TEMPLATE_SHADOW_ROOT = 'data-template-shadow-root'
  const NOTE_TAGNAME = 'single-file-note'
  const NOTE_CLASS = 'note'
  const NOTE_MASK_CLASS = 'note-mask'
  const NOTE_HIDDEN_CLASS = 'note-hidden'
  const NOTE_ANCHORED_CLASS = 'note-anchored'
  const NOTE_SELECTED_CLASS = 'note-selected'
  const NOTE_MOVING_CLASS = 'note-moving'
  const NOTE_MASK_MOVING_CLASS = 'note-mask-moving'
  const PAGE_MASK_CLASS = 'page-mask'
  const MASK_CLASS = 'single-file-mask'
  const PAGE_MASK_CONTAINER_CLASS = 'single-file-page-mask'
  const HIGHLIGHT_CLASS = 'single-file-highlight'
  const REMOVED_CONTENT_CLASS = 'single-file-removed'
  const HIGHLIGHT_HIDDEN_CLASS = 'single-file-highlight-hidden'
  const PAGE_MASK_ACTIVE_CLASS = 'page-mask-active'
  const CUT_HOVER_CLASS = 'single-file-cut-hover'
  const CUT_OUTER_HOVER_CLASS = 'single-file-cut-outer-hover'
  const CUT_SELECTED_CLASS = 'single-file-cut-selected'
  const CUT_OUTER_SELECTED_CLASS = 'single-file-cut-outer-selected'
  const NOTE_HEADER_HEIGHT = 25
  const DISABLED_NOSCRIPT_ATTRIBUTE_NAME = 'data-single-file-disabled-noscript'
  const COMMENT_HEADER = 'Snapshot WCAG Tool'

  let NOTES_WEB_STYLESHEET
  let MASK_WEB_STYLESHEET
  let HIGHLIGHTS_WEB_STYLESHEET
  let selectedNote
  let anchorElement
  let maskNoteElement
  let maskPageElement
  let highlightSelectionMode
  let removeHighlightMode
  let resizingNoteMode
  let movingNoteMode
  let highlightColor
  let collapseNoteTimeout
  let cuttingOuterMode
  let cuttingMode
  let cuttingPath
  let cuttingPathIndex
  let previousContent
  let removedElements = []
  let removedElementIndex = 0
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
    return {}
  }
  window.onresize = reflowNotes
  document.ondragover = (event) => event.preventDefault()
  document.ondrop = async (event) => {
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0]
      event.preventDefault()
      const content = new TextDecoder().decode(await file.arrayBuffer())
      await init(content, { filename: file.name })
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
      deserializeShadowRoots(document)
      document.documentElement.appendChild(getStyleElement(HIGHLIGHTS_WEB_STYLESHEET))
      maskPageElement = getMaskElement(PAGE_MASK_CLASS, PAGE_MASK_CONTAINER_CLASS)
      maskNoteElement = getMaskElement(NOTE_MASK_CLASS)
      document.documentElement.onmousedown = document.documentElement.ontouchstart = onMouseDown
      document.documentElement.onmouseup = document.documentElement.ontouchend = onMouseUp
      document.documentElement.onmouseover = onMouseOver
      document.documentElement.onmouseout = onMouseOut
      document.documentElement.onkeydown = onKeyDown
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
    ;[NOTES_WEB_STYLESHEET, MASK_WEB_STYLESHEET, HIGHLIGHTS_WEB_STYLESHEET] = await Promise.all([
      minifyText(await (await fetch('/extension/ui/pages/editor-note-web.css')).text()),
      minifyText(await (await fetch('/extension/ui/pages/editor-mask-web.css')).text()),
      minifyText(await (await fetch('/extension/ui/pages/editor-frame-web.css')).text()),
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
        !element.parentElement.tagName.toLowerCase() !== NOTE_TAGNAME &&
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

  function onMouseDown(event) {
    if ((cuttingMode || cuttingOuterMode) && cuttingPath) {
      event.preventDefault()
    }
  }

  function onMouseUp(event) {
    if (highlightSelectionMode) {
      highlightSelection()
      onUpdate(false)
    }
    if (removeHighlightMode) {
      let element = event.target
      let done
      while (element && !done) {
        if (element.classList.contains(HIGHLIGHT_CLASS)) {
          document
            .querySelectorAll(
              `.${HIGHLIGHT_CLASS}[data-singlefile-highlight-id=${JSON.stringify(
                element.dataset.singlefileHighlightId
              )}]`
            )
            .forEach((highlightedElement) => {
              resetHighlightedElement(highlightedElement)
              onUpdate(false)
            })
          done = true
        }
        element = element.parentElement
      }
    }
    if (resizingNoteMode) {
      resizingNoteMode = false
      document.documentElement.style.removeProperty('user-select')
      maskPageElement.classList.remove(PAGE_MASK_ACTIVE_CLASS)
      document.documentElement.ontouchmove = document.documentElement.onmousemove = null
      onUpdate(false)
    }
    if (movingNoteMode) {
      anchorNote(
        movingNoteMode.event || event,
        selectedNote,
        movingNoteMode.deltaX,
        movingNoteMode.deltaY
      )
      movingNoteMode = null
      document.documentElement.ontouchmove = document.documentElement.onmousemove = null
      onUpdate(false)
    }
    if (collapseNoteTimeout) {
      clearTimeout(collapseNoteTimeout)
      collapseNoteTimeout = null
    }
    if ((cuttingMode || cuttingOuterMode) && cuttingPath) {
      if (event.ctrlKey) {
        const element = cuttingPath[cuttingPathIndex]
        element.classList.toggle(cuttingMode ? CUT_SELECTED_CLASS : CUT_OUTER_SELECTED_CLASS)
      } else {
        validateCutElement(event.shiftKey)
      }
    }
  }

  function onMouseOver(event) {
    if (cuttingMode || cuttingOuterMode) {
      const { target } = event
      if (target.classList) {
        let ancestorFound
        document
          .querySelectorAll(`.${cuttingMode ? CUT_SELECTED_CLASS : CUT_OUTER_SELECTED_CLASS}`)
          .forEach((element) => {
            if (element == target || isAncestor(element, target) || isAncestor(target, element)) {
              ancestorFound = element
            }
          })
        if (ancestorFound) {
          cuttingPath = [ancestorFound]
        } else {
          cuttingPath = getParents(event.target)
        }
        cuttingPathIndex = 0
        highlightCutElement()
      }
    }
  }

  function onMouseOut() {
    if (cuttingMode || cuttingOuterMode) {
      if (cuttingPath) {
        unhighlightCutElement()
        cuttingPath = null
      }
    }
  }

  function onKeyDown(event) {
    if (cuttingMode || cuttingOuterMode) {
      if (event.code == 'Tab') {
        if (cuttingPath) {
          const delta = event.shiftKey ? -1 : 1
          const element = cuttingPath[cuttingPathIndex]
          let nextElement = cuttingPath[cuttingPathIndex + delta]
          if (nextElement) {
            let pathIndex = cuttingPathIndex + delta
            while (
              nextElement &&
              ((delta == 1 &&
                element.getBoundingClientRect().width >=
                  nextElement.getBoundingClientRect().width &&
                element.getBoundingClientRect().height >=
                  nextElement.getBoundingClientRect().height) ||
                (delta == -1 &&
                  element.getBoundingClientRect().width <=
                    nextElement.getBoundingClientRect().width &&
                  element.getBoundingClientRect().height <=
                    nextElement.getBoundingClientRect().height))
            ) {
              pathIndex += delta
              nextElement = cuttingPath[pathIndex]
            }
            if (
              nextElement &&
              nextElement.classList &&
              nextElement != document.body &&
              nextElement != document.documentElement
            ) {
              unhighlightCutElement()
              cuttingPathIndex = pathIndex
              highlightCutElement()
            }
          }
        }
        event.preventDefault()
      }
      if (event.code == 'Space') {
        if (cuttingPath) {
          if (event.ctrlKey) {
            const element = cuttingPath[cuttingPathIndex]
            element.classList.add(cuttingMode ? CUT_SELECTED_CLASS : CUT_OUTER_SELECTED_CLASS)
          } else {
            validateCutElement(event.shiftKey)
          }
          event.preventDefault()
        }
      }
      if (event.code == 'Escape') {
        resetSelectedElements()
        event.preventDefault()
      }
      if (event.key.toLowerCase() == 'z' && event.ctrlKey) {
        if (event.shiftKey) {
          redoCutPage()
        } else {
          undoCutPage()
        }
        event.preventDefault()
      }
    }
    if (event.key.toLowerCase() == 's' && event.ctrlKey) {
      window.parent.postMessage(JSON.stringify({ method: 'savePage' }), '*')
      event.preventDefault()
    }
    if (event.key.toLowerCase() == 'p' && event.ctrlKey) {
      printPage()
      event.preventDefault()
    }
  }

  function printPage() {
    unhighlightCutElement()
    resetSelectedElements()
    window.print()
  }

  function highlightCutElement() {
    const element = cuttingPath[cuttingPathIndex]
    element.classList.add(cuttingMode ? CUT_HOVER_CLASS : CUT_OUTER_HOVER_CLASS)
  }

  function unhighlightCutElement() {
    if (cuttingPath) {
      const element = cuttingPath[cuttingPathIndex]
      element.classList.remove(CUT_HOVER_CLASS)
      element.classList.remove(CUT_OUTER_HOVER_CLASS)
    }
  }

  function undoCutPage() {
    if (removedElementIndex) {
      removedElements[removedElementIndex - 1].forEach((element) =>
        element.classList.remove(REMOVED_CONTENT_CLASS)
      )
      removedElementIndex--
    }
  }

  function redoCutPage() {
    if (removedElementIndex < removedElements.length) {
      removedElements[removedElementIndex].forEach((element) =>
        element.classList.add(REMOVED_CONTENT_CLASS)
      )
      removedElementIndex++
    }
  }

  function validateCutElement(invert) {
    const selectedElement = cuttingPath[cuttingPathIndex]
    if ((cuttingMode && !invert) || (cuttingOuterMode && invert)) {
      if (
        document.documentElement != selectedElement &&
        selectedElement.tagName.toLowerCase() != NOTE_TAGNAME
      ) {
        const elementsRemoved = [selectedElement].concat(
          ...document.querySelectorAll(
            `.${CUT_SELECTED_CLASS}, .${CUT_SELECTED_CLASS} *, .${CUT_HOVER_CLASS} *`
          )
        )
        resetSelectedElements()
        if (elementsRemoved.length) {
          elementsRemoved.forEach((element) => {
            if (element.tagName.toLowerCase() == NOTE_TAGNAME) {
              resetAnchorNote(element)
            } else {
              element.classList.add(REMOVED_CONTENT_CLASS)
            }
          })
          removedElements[removedElementIndex] = elementsRemoved
          removedElementIndex++
          removedElements.length = removedElementIndex
          onUpdate(false)
        }
      }
    } else if (
      document.documentElement != selectedElement &&
      selectedElement.tagName.toLowerCase() != NOTE_TAGNAME
    ) {
      const elements = []
      const searchSelector = `*:not(style):not(meta):not(.${REMOVED_CONTENT_CLASS})`
      const elementsKept = [selectedElement].concat(
        ...document.querySelectorAll(`.${CUT_OUTER_SELECTED_CLASS}`)
      )
      document.body.querySelectorAll(searchSelector).forEach((element) => {
        let removed = true
        elementsKept.forEach(
          (elementKept) =>
            (removed =
              removed &&
              elementKept != element &&
              !isAncestor(elementKept, element) &&
              !isAncestor(element, elementKept))
        )
        if (removed) {
          if (element.tagName.toLowerCase() == NOTE_TAGNAME) {
            resetAnchorNote(element)
          } else {
            elements.push(element)
          }
        }
      })
      elementsKept.forEach((elementKept) => {
        const elementKeptRect = elementKept.getBoundingClientRect()
        elementKept.querySelectorAll(searchSelector).forEach((descendant) => {
          const descendantRect = descendant.getBoundingClientRect()
          if (
            descendantRect.width &&
            descendantRect.height &&
            (descendantRect.left + descendantRect.width < elementKeptRect.left ||
              descendantRect.right > elementKeptRect.right + elementKeptRect.width ||
              descendantRect.top + descendantRect.height < elementKeptRect.top ||
              descendantRect.bottom > elementKeptRect.bottom + elementKeptRect.height)
          ) {
            elements.push(descendant)
          }
        })
      })
      resetSelectedElements()
      if (elements.length) {
        elements.forEach((element) => element.classList.add(REMOVED_CONTENT_CLASS))
        removedElements[removedElementIndex] = elements
        removedElementIndex++
        removedElements.length = removedElementIndex
        onUpdate(false)
      }
    }
  }

  function resetSelectedElements(doc = document) {
    doc
      .querySelectorAll(`.${CUT_OUTER_SELECTED_CLASS}, .${CUT_SELECTED_CLASS}`)
      .forEach((element) => {
        element.classList.remove(CUT_OUTER_SELECTED_CLASS)
        element.classList.remove(CUT_SELECTED_CLASS)
      })
  }

  function anchorNote(event, noteElement, deltaX, deltaY) {
    event.preventDefault()
    const { clientX, clientY } = getPosition(event)
    document.documentElement.style.removeProperty('user-select')
    noteElement.classList.remove(NOTE_MOVING_CLASS)
    maskNoteElement.classList.remove(NOTE_MASK_MOVING_CLASS)
    maskPageElement.classList.remove(PAGE_MASK_ACTIVE_CLASS)
    maskNoteElement.classList.remove(noteElement.dataset.color)
    const headerElement = noteElement.querySelector('header')
    headerElement.ontouchmove = document.documentElement.onmousemove = null
    let currentElement = anchorElement
    let positionedElement
    while (currentElement.parentElement && !positionedElement) {
      if (!FORBIDDEN_TAG_NAMES.includes(currentElement.tagName.toLowerCase())) {
        const currentElementStyle = getComputedStyle(currentElement)
        if (currentElementStyle.position != 'static') {
          positionedElement = currentElement
        }
      }
      currentElement = currentElement.parentElement
    }
    if (!positionedElement) {
      positionedElement = document.documentElement
    }
    const containerElement = noteElement.getRootNode().host
    if (positionedElement == document.documentElement) {
      const firstMaskElement = document.querySelector(`.${MASK_CLASS}`)
      firstMaskElement.parentElement.insertBefore(containerElement, firstMaskElement)
    } else {
      positionedElement.appendChild(containerElement)
    }
    const boundingRectPositionedElement = positionedElement.getBoundingClientRect()
    const stylePositionedElement = window.getComputedStyle(positionedElement)
    const borderX = parseInt(stylePositionedElement.getPropertyValue('border-left-width'))
    const borderY = parseInt(stylePositionedElement.getPropertyValue('border-top-width'))
    noteElement.style.setProperty('position', 'absolute')
    noteElement.style.setProperty(
      'left',
      `${clientX - boundingRectPositionedElement.x - deltaX - borderX}px`
    )
    noteElement.style.setProperty(
      'top',
      `${clientY - boundingRectPositionedElement.y - deltaY - borderY}px`
    )
  }

  function resetAnchorNote(containerElement) {
    const { noteId } = containerElement.dataset
    const noteElement = containerElement.shadowRoot.childNodes[1]
    noteElement.classList.remove(NOTE_ANCHORED_CLASS)
    deleteNoteRef(containerElement, noteId)
    addNoteRef(document.documentElement, noteId)
    document.documentElement.insertBefore(containerElement, maskPageElement.getRootNode().host)
  }

  function getPosition(event) {
    if (event.touches && event.touches.length) {
      const touch = event.touches[0]
      return touch
    }
    return event
  }

  function highlightSelection() {
    let highlightId = 0
    document
      .querySelectorAll(`.${HIGHLIGHT_CLASS}`)
      .forEach(
        (highlightedElement) =>
          (highlightId = Math.max(highlightId, highlightedElement.dataset.singlefileHighlightId))
      )
    highlightId++
    const selection = window.getSelection()
    const highlightedNodes = new Set()
    for (let indexRange = 0; indexRange < selection.rangeCount; indexRange++) {
      const range = selection.getRangeAt(indexRange)
      if (!range.collapsed) {
        if (range.commonAncestorContainer.nodeType == range.commonAncestorContainer.TEXT_NODE) {
          let contentText = range.startContainer.splitText(range.startOffset)
          contentText = contentText.splitText(range.endOffset)
          addHighLightedNode(contentText.previousSibling)
        } else {
          const treeWalker = document.createTreeWalker(
            range.commonAncestorContainer,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
          )
          let highlightNodes
          while (treeWalker.nextNode()) {
            if (highlightNodes && !treeWalker.currentNode.contains(range.endContainer)) {
              addHighLightedNode(treeWalker.currentNode)
            }
            if (treeWalker.currentNode == range.startContainer) {
              if (range.startContainer.nodeType == range.startContainer.TEXT_NODE) {
                const contentText = range.startContainer.splitText(range.startOffset)
                treeWalker.nextNode()
                addHighLightedNode(contentText)
              } else {
                addHighLightedNode(range.startContainer.childNodes[range.startOffset])
              }
              highlightNodes = true
            }
            if (treeWalker.currentNode == range.endContainer) {
              if (range.endContainer.nodeType == range.endContainer.TEXT_NODE) {
                const contentText = range.endContainer.splitText(range.endOffset)
                treeWalker.nextNode()
                addHighLightedNode(contentText.previousSibling)
              } else {
                addHighLightedNode(range.endContainer.childNodes[range.endOffset])
              }
              highlightNodes = false
            }
          }
          range.collapse()
        }
      }
    }
    highlightedNodes.forEach((node) => highlightNode(node))

    function addHighLightedNode(node) {
      if (node && node.textContent.trim()) {
        if (
          node.nodeType == node.TEXT_NODE &&
          node.parentElement.childNodes.length == 1 &&
          node.parentElement.classList.contains(HIGHLIGHT_CLASS)
        ) {
          highlightedNodes.add(node.parentElement)
        } else {
          highlightedNodes.add(node)
        }
      }
    }

    function highlightNode(node) {
      if (node.nodeType == node.ELEMENT_NODE) {
        resetHighlightedElement(node)
        node.classList.add(HIGHLIGHT_CLASS)
        node.classList.add(highlightColor)
        node.dataset.singlefileHighlightId = highlightId
      } else if (node.parentElement) {
        highlightTextNode(node)
      }
    }

    function highlightTextNode(node) {
      const spanElement = document.createElement('span')
      spanElement.classList.add(HIGHLIGHT_CLASS)
      spanElement.classList.add(highlightColor)
      spanElement.textContent = node.textContent
      spanElement.dataset.singlefileHighlightId = highlightId
      node.parentNode.replaceChild(spanElement, node)
      return spanElement
    }
  }

  function getParents(element) {
    const path = []
    while (element) {
      path.push(element)
      path.push(element)
      element = element.parentElement
    }
    return path
  }

  function formatPage(applySystemTheme) {
    previousContent = getContent(false, [])
    const shadowRoots = {}
    const classesToPreserve = [
      'single-file-highlight',
      'single-file-highlight-yellow',
      'single-file-highlight-green',
      'single-file-highlight-pink',
      'single-file-highlight-blue',
    ]
    document.querySelectorAll(NOTE_TAGNAME).forEach((containerElement) => {
      shadowRoots[containerElement.dataset.noteId] = containerElement.shadowRoot
      const className = `singlefile-note-id-${containerElement.dataset.noteId}`
      containerElement.classList.add(className)
      classesToPreserve.push(className)
    })
    const article = new Readability(document, { classesToPreserve }).parse()
    removedElements = []
    removedElementIndex = 0
    document.body.innerHTML = ''
    const domParser = new DOMParser()
    const doc = domParser.parseFromString(article.content, 'text/html')
    const { contentEditable } = document.body
    document.documentElement.replaceChild(doc.body, document.body)
    document.querySelectorAll(NOTE_TAGNAME).forEach((containerElement) => {
      const noteId = Array.from(containerElement.classList)
        .find((className) => /singlefile-note-id-\d+/.test(className))
        .split('singlefile-note-id-')[1]
      containerElement.classList.remove(`singlefile-note-id-${noteId}`)
      containerElement.dataset.noteId = noteId
      if (!containerElement.shadowRoot) {
        containerElement.attachShadow({ mode: 'open' })
        containerElement.shadowRoot.appendChild(shadowRoots[noteId])
      }
    })
    document
      .querySelectorAll(NOTE_TAGNAME)
      .forEach(
        (containerElement) =>
          (containerElement.shadowRoot = shadowRoots[containerElement.dataset.noteId])
      )
    document.body.contentEditable = contentEditable
    document.head.querySelectorAll('style').forEach((styleElement) => styleElement.remove())
    const styleElement = document.createElement('style')
    styleElement.textContent = STYLE_FORMATTED_PAGE
    document.head.appendChild(styleElement)
    document.body.classList.add('moz-reader-content')
    document.body.classList.add('content-width6')
    document.body.classList.add('reader-show-element')
    document.body.classList.add('sans-serif')
    document.body.classList.add('container')
    document.body.classList.add('line-height4')
    const prefersColorSchemeDark = matchMedia('(prefers-color-scheme: dark)')
    if (applySystemTheme && prefersColorSchemeDark && prefersColorSchemeDark.matches) {
      document.body.classList.add('dark')
    }
    document.body.style.setProperty('display', 'block')
    document.body.style.setProperty('padding', '24px')
    const titleElement = document.createElement('h1')
    titleElement.classList.add('reader-title')
    titleElement.textContent = article.title
    document.body.insertBefore(titleElement, document.body.firstChild)
    document.querySelectorAll('a[href]').forEach((element) => {
      const href = element.getAttribute('href').trim()
      if (href.startsWith(`${document.baseURI}#`)) {
        element.setAttribute('href', href.substring(document.baseURI.length))
      }
    })
    document.documentElement.appendChild(getStyleElement(HIGHLIGHTS_WEB_STYLESHEET))
    maskPageElement = getMaskElement(PAGE_MASK_CLASS, PAGE_MASK_CONTAINER_CLASS)
    maskNoteElement = getMaskElement(NOTE_MASK_CLASS)
    reflowNotes()
    onUpdate(false)
  }

  async function cancelFormatPage() {
    if (previousContent) {
      const { contentEditable } = document.body
      await init(previousContent, { reset: true })
      document.body.contentEditable = contentEditable
      onUpdate(false)
      previousContent = null
    }
  }

  function getContent(compressHTML, updatedResources) {
    unhighlightCutElement()
    serializeShadowRoots(document)
    const doc = document.cloneNode(true)
    resetSelectedElements(doc)
    deserializeShadowRoots(doc)
    deserializeShadowRoots(document)
    doc.querySelectorAll(`[${DISABLED_NOSCRIPT_ATTRIBUTE_NAME}]`).forEach((element) => {
      element.textContent = element.getAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME)
      element.removeAttribute(DISABLED_NOSCRIPT_ATTRIBUTE_NAME)
    })
    doc
      .querySelectorAll(`.${MASK_CLASS}, .${REMOVED_CONTENT_CLASS}`)
      .forEach((maskElement) => maskElement.remove())
    doc
      .querySelectorAll(`.${HIGHLIGHT_CLASS}`)
      .forEach((noteElement) => noteElement.classList.remove(HIGHLIGHT_HIDDEN_CLASS))
    doc.querySelectorAll(`template[${SHADOW_MODE_ATTRIBUTE_NAME}]`).forEach((templateElement) => {
      const noteElement = templateElement.querySelector(`.${NOTE_CLASS}`)
      if (noteElement) {
        noteElement.classList.remove(NOTE_HIDDEN_CLASS)
      }
      const mainElement = templateElement.querySelector('textarea')
      if (mainElement) {
        mainElement.textContent = mainElement.value
      }
    })
    doc.querySelectorAll('iframe').forEach((element) => {
      const pointerEvents = 'pointer-events'
      element.style.setProperty(
        pointerEvents,
        element.style.getPropertyValue(`-sf-${pointerEvents}`),
        element.style.getPropertyPriority(`-sf-${pointerEvents}`)
      )
      element.style.removeProperty(`-sf-${pointerEvents}`)
    })
    doc.body.removeAttribute('contentEditable')
    const scriptElement = doc.createElement('script')
    scriptElement.setAttribute(SCRIPT_TEMPLATE_SHADOW_ROOT, '')
    scriptElement.textContent = getEmbedScript()
    doc.body.appendChild(scriptElement)
    const newResources = Object.keys(updatedResources)
      .filter((url) => updatedResources[url].type == 'stylesheet')
      .map((url) => updatedResources[url])
    newResources.forEach((resource) => {
      const element = doc.createElement('style')
      doc.body.appendChild(element)
      element.textContent = resource.content
    })
    return singlefile.helper.serialize(doc, compressHTML)
  }

  function onUpdate(saved) {
    window.parent.postMessage(JSON.stringify({ method: 'onUpdate', saved }), '*')
  }

  function reflowNotes() {
    document.querySelectorAll(NOTE_TAGNAME).forEach((containerElement) => {
      const noteElement = containerElement.shadowRoot.querySelector(`.${NOTE_CLASS}`)
      const noteBoundingRect = noteElement.getBoundingClientRect()
      const anchorElement = getAnchorElement(containerElement)
      const anchorBoundingRect = anchorElement.getBoundingClientRect()
      const maxX =
        anchorBoundingRect.x + Math.max(0, anchorBoundingRect.width - noteBoundingRect.width)
      const minX = anchorBoundingRect.x
      const maxY =
        anchorBoundingRect.y + Math.max(0, anchorBoundingRect.height - NOTE_HEADER_HEIGHT)
      const minY = anchorBoundingRect.y
      let left = parseInt(noteElement.style.getPropertyValue('left'))
      let top = parseInt(noteElement.style.getPropertyValue('top'))
      if (noteBoundingRect.x > maxX) {
        left -= noteBoundingRect.x - maxX
      }
      if (noteBoundingRect.x < minX) {
        left += minX - noteBoundingRect.x
      }
      if (noteBoundingRect.y > maxY) {
        top -= noteBoundingRect.y - maxY
      }
      if (noteBoundingRect.y < minY) {
        top += minY - noteBoundingRect.y
      }
      noteElement.style.setProperty('position', 'absolute')
      noteElement.style.setProperty('left', `${left}px`)
      noteElement.style.setProperty('top', `${top}px`)
    })
  }

  function resetHighlightedElement(element) {
    element.classList.remove(HIGHLIGHT_CLASS)
    element.classList.remove('single-file-highlight-yellow')
    element.classList.remove('single-file-highlight-pink')
    element.classList.remove('single-file-highlight-blue')
    element.classList.remove('single-file-highlight-green')
    delete element.dataset.singlefileHighlightId
  }

  function serializeShadowRoots(node) {
    node.querySelectorAll('*').forEach((element) => {
      const shadowRoot = getShadowRoot(element)
      if (shadowRoot) {
        serializeShadowRoots(shadowRoot)
        const templateElement = document.createElement('template')
        templateElement.setAttribute(SHADOW_MODE_ATTRIBUTE_NAME, 'open')
        templateElement.appendChild(shadowRoot)
        element.appendChild(templateElement)
      }
    })
  }

  function deserializeShadowRoots(node) {
    node.querySelectorAll(`template[${SHADOW_MODE_ATTRIBUTE_NAME}]`).forEach((element) => {
      if (element.parentElement) {
        let shadowRoot = getShadowRoot(element.parentElement)
        if (shadowRoot) {
          Array.from(element.childNodes).forEach((node) => shadowRoot.appendChild(node))
          element.remove()
        } else {
          try {
            shadowRoot = element.parentElement.attachShadow({ mode: 'open' })
            const contentDocument = new DOMParser().parseFromString(element.innerHTML, 'text/html')
            Array.from(contentDocument.head.childNodes).forEach((node) =>
              shadowRoot.appendChild(node)
            )
            Array.from(contentDocument.body.childNodes).forEach((node) =>
              shadowRoot.appendChild(node)
            )
          } catch (error) {
            // ignored
          }
        }
        if (shadowRoot) {
          deserializeShadowRoots(shadowRoot)
        }
      }
    })
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
  }

  function getEmbedScript() {
    return minifyText(`(() => {
			document.currentScript.remove();
			const processNode = node => {
				node.querySelectorAll("template[${SHADOW_MODE_ATTRIBUTE_NAME}]").forEach(element=>{
					let shadowRoot = getShadowRoot(element.parentElement);
					if (!shadowRoot) {
						try {
							shadowRoot = element.parentElement.attachShadow({mode:element.getAttribute("${SHADOW_MODE_ATTRIBUTE_NAME}"),delegatesFocus:Boolean(element.getAttribute("${SHADOW_DELEGATE_FOCUS_ATTRIBUTE_NAME}"))});
							shadowRoot.innerHTML = element.innerHTML;
							element.remove();
						} catch (error) {}						
						if (shadowRoot) {
							processNode(shadowRoot);
						}
					}					
				})
			};
			const FORBIDDEN_TAG_NAMES = ${JSON.stringify(FORBIDDEN_TAG_NAMES)};
			const NOTE_TAGNAME = ${JSON.stringify(NOTE_TAGNAME)};
			const NOTE_CLASS = ${JSON.stringify(NOTE_CLASS)};
			const NOTE_ANCHORED_CLASS = ${JSON.stringify(NOTE_ANCHORED_CLASS)};
			const NOTE_SELECTED_CLASS = ${JSON.stringify(NOTE_SELECTED_CLASS)};
			const NOTE_MOVING_CLASS = ${JSON.stringify(NOTE_MOVING_CLASS)};
			const NOTE_MASK_MOVING_CLASS = ${JSON.stringify(NOTE_MASK_MOVING_CLASS)};
			const MASK_CLASS = ${JSON.stringify(MASK_CLASS)};
			const HIGHLIGHT_CLASS = ${JSON.stringify(HIGHLIGHT_CLASS)};
			const NOTES_WEB_STYLESHEET = ${JSON.stringify(NOTES_WEB_STYLESHEET)};
			const MASK_WEB_STYLESHEET = ${JSON.stringify(MASK_WEB_STYLESHEET)};
			const NOTE_HEADER_HEIGHT = ${JSON.stringify(NOTE_HEADER_HEIGHT)};
			const PAGE_MASK_ACTIVE_CLASS = ${JSON.stringify(PAGE_MASK_ACTIVE_CLASS)};
			const REMOVED_CONTENT_CLASS = ${JSON.stringify(REMOVED_CONTENT_CLASS)};
			const reflowNotes = ${minifyText(reflowNotes.toString())};			
			const addNoteRef = ${minifyText(addNoteRef.toString())};
			const deleteNoteRef = ${minifyText(deleteNoteRef.toString())};
			const getNoteRefs = ${minifyText(getNoteRefs.toString())};
			const setNoteRefs = ${minifyText(setNoteRefs.toString())};
			const getAnchorElement = ${minifyText(getAnchorElement.toString())};
			const getMaskElement = ${minifyText(getMaskElement.toString())};
			const getStyleElement = ${minifyText(getStyleElement.toString())};
			const attachNoteListeners = ${minifyText(attachNoteListeners.toString())};
			const anchorNote = ${minifyText(anchorNote.toString())};
			const getPosition = ${minifyText(getPosition.toString())};
			const onMouseUp = ${minifyText(onMouseUp.toString())};
			const getShadowRoot = ${minifyText(getShadowRoot.toString())};
			const maskNoteElement = getMaskElement(${JSON.stringify(NOTE_MASK_CLASS)});
			const maskPageElement = getMaskElement(${JSON.stringify(PAGE_MASK_CLASS)}, ${JSON.stringify(
      PAGE_MASK_CONTAINER_CLASS
    )});
			let selectedNote, highlightSelectionMode, removeHighlightMode, resizingNoteMode, movingNoteMode, collapseNoteTimeout, cuttingMode, cuttingOuterMode;
			window.onresize = reflowNotes;
			window.onUpdate = () => {};
			document.documentElement.onmouseup = document.documentElement.ontouchend = onMouseUp;
			window.addEventListener("DOMContentLoaded", () => {
				processNode(document);
				reflowNotes();
				document.querySelectorAll(${JSON.stringify(
          NOTE_TAGNAME
        )}).forEach(noteElement => attachNoteListeners(noteElement));
			});
		})()`)
  }

  function getStyleElement(stylesheet) {
    const linkElement = document.createElement('style')
    linkElement.textContent = stylesheet
    return linkElement
  }

  function getAnchorElement(containerElement) {
    return (
      document.querySelector(
        `[data-single-file-note-refs^=${JSON.stringify(
          containerElement.dataset.noteId
        )}], [data-single-file-note-refs$=${JSON.stringify(
          containerElement.dataset.noteId
        )}], [data-single-file-note-refs*=${JSON.stringify(
          `,${containerElement.dataset.noteId},`
        )}]`
      ) || document.documentElement
    )
  }

  function addNoteRef(anchorElement, noteId) {
    const noteRefs = getNoteRefs(anchorElement)
    noteRefs.push(noteId)
    setNoteRefs(anchorElement, noteRefs)
  }

  function deleteNoteRef(containerElement, noteId) {
    const anchorElement = getAnchorElement(containerElement)
    const noteRefs = getNoteRefs(anchorElement).filter((noteRefs) => noteRefs != noteId)
    if (noteRefs.length) {
      setNoteRefs(anchorElement, noteRefs)
    } else {
      delete anchorElement.dataset.singleFileNoteRefs
    }
  }

  function getNoteRefs(anchorElement) {
    return JSON.parse(`[${anchorElement.dataset.singleFileNoteRefs || ''}]`)
  }

  function setNoteRefs(anchorElement, noteRefs) {
    anchorElement.dataset.singleFileNoteRefs = noteRefs.toString()
  }

  function minifyText(text) {
    return text.replace(/[\n\t\s]+/g, ' ')
  }

  function isAncestor(element, otherElement) {
    return (
      otherElement.parentElement &&
      (element == otherElement.parentElement || isAncestor(element, otherElement.parentElement))
    )
  }

  function getShadowRoot(element) {
    const { chrome } = window
    if (element.openOrClosedShadowRoot) {
      return element.openOrClosedShadowRoot
    }
    if (chrome && chrome.dom && chrome.dom.openOrClosedShadowRoot) {
      try {
        return chrome.dom.openOrClosedShadowRoot(element)
      } catch (error) {
        return element.shadowRoot
      }
    } else {
      return element.shadowRoot
    }
  }

  function detectSavedPage(document) {
    const firstDocumentChild = document.documentElement.firstChild
    return (
      firstDocumentChild.nodeType == Node.COMMENT_NODE &&
      (firstDocumentChild.textContent.includes(COMMENT_HEADER) ||
        firstDocumentChild.textContent.includes('--'))
    )
  }
})(typeof globalThis === 'object' ? globalThis : window)
