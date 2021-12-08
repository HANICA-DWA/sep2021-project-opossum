/* global webkitRequestFileSystem, TEMPORARY */

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useSliders } from './sliders.hooks'

let tabData
let tabDataContents = []
const FS_SIZE = 100 * 1024 * 1024
const editorIframe = document.querySelector('.editor')

export const useRegisterEditorEffects = () => {
  const [{ openCreateAndEditSlider }, { elementSelectorIsOpen }] = useSliders()
  const highlightedElementSelector = useSelector(
    (state) => state.annotation.highlightedElementSelector
  )

  useEffect(() => {
    const eventListener = () => {
      browser.runtime.sendMessage({ method: 'editor.getTabData' })
    }
    addEventListener('load', eventListener)
    return () => {
      removeEventListener('load', eventListener)
    }
  }, [])

  useEffect(() => {
    const eventListener = (event) => {
      if (tabData.options.warnUnsavedPage && !tabData.docSaved) {
        event.preventDefault()
        event.returnValue = ''
      }
    }
    addEventListener('beforeunload', eventListener)
    return () => {
      removeEventListener('beforeunload', eventListener)
    }
  }, [])

  useEffect(() => {
    const eventListener = (event) => {
      const message = JSON.parse(event.data)
      if (message.method === 'onUpdate') {
        tabData.docSaved = message.saved
      }
      if (message.method === 'onInit') {
        tabData.options.disableFormatPage = !message.formatPageEnabled
        // formatPageButton.hidden = !message.formatPageEnabled;
        document.title = `[WCAG] ${message.title}`
        if (message.filename) {
          tabData.filename = message.filename
        }
        if (message.icon) {
          const linkElement = document.createElement('link')
          linkElement.rel = 'icon'
          linkElement.href = message.icon
          document.head.appendChild(linkElement)
        }
        tabData.docSaved = true
      }

      if (message.method === 'onElementSelected') {
        openCreateAndEditSlider(message.content)
      }
      return {}
    }

    addEventListener('message', eventListener)

    return () => {
      removeEventListener('message', eventListener)
    }
  }, [openCreateAndEditSlider])

  useEffect(() => {
    if (elementSelectorIsOpen) {
      editorIframe.contentWindow.postMessage(
        JSON.stringify({
          method: 'elementSelectionMode',
          content: true,
        }),
        '*'
      )
    } else {
      editorIframe.contentWindow.postMessage(
        JSON.stringify({
          method: 'elementSelectionMode',
          content: false,
        }),
        '*'
      )
    }
  }, [elementSelectorIsOpen])

  useEffect(() => {
    editorIframe.contentWindow.postMessage(
      JSON.stringify({
        method: 'highlightElement',
        content: highlightedElementSelector,
      }),
      '*'
    )
  }, [highlightedElementSelector])

  useEffect(() => {
    const eventListener = (message) => {
      if (message.method === 'editor.setTabData') {
        if (message.content) {
          if (message.truncated) {
            tabDataContents.push(message.content)
          } else {
            tabDataContents = [message.content]
          }
          if (!message.truncated || message.finished) {
            tabData = JSON.parse(tabDataContents.join(''))
            tabData.tabId = message.tabId
            tabData.options = message.options
            tabDataContents = []
            editorIframe.contentWindow.postMessage(
              JSON.stringify({ method: 'init', content: tabData.content }),
              '*'
            )
            editorIframe.contentWindow.focus()
            saveTabData()
          }
        } else {
          tabData = { tabId: message.tabId }
          loadTabData().then(() => {
            editorIframe.contentWindow.postMessage(
              JSON.stringify({ method: 'init', content: tabData.content }),
              '*'
            )
            editorIframe.contentWindow.focus()
          })
        }
        return Promise.resolve({})
      }
      return {}
    }
    browser.runtime.onMessage.addListener(eventListener)
    return () => {
      browser.runtime.onMessage.removeListener(eventListener)
    }
  }, [])
}

function loadTabData() {
  return new Promise((resolve, reject) => {
    webkitRequestFileSystem(
      TEMPORARY,
      FS_SIZE,
      (fs) => {
        fs.root.getFile(
          tabData.tabId,
          {},
          (fileEntry) => {
            fileEntry.file((data) => {
              data
                .text()
                .then((jsonData) => {
                  tabData = JSON.parse(jsonData)
                  resolve()
                })
                .catch(reject)
            }, reject)
          },
          reject
        )
      },
      reject
    )
  })
}

function saveTabData() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(tabData)
    webkitRequestFileSystem(
      TEMPORARY,
      FS_SIZE,
      (fs) => {
        fs.root.getFile(
          tabData.tabId,
          { create: true },
          (fileEntry) => {
            fileEntry.createWriter((fileWriter) => {
              fileWriter.onwriteend = () => resolve()
              fileWriter.onerror = reject
              fileWriter.write(new Blob([data], { type: 'text/plain' }))
            }, reject)
          },
          reject
        )
      },
      reject
    )
  })
}
