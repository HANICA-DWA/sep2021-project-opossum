/* global browser */

import * as config from './config.js'
import * as ui from '../../ui/bg/index.js'
import extensionConfig from '../../../../config.js'

const MAX_CONTENT_SIZE = 32 * (1024 * 1024)
const EDITOR_PAGE_URL = '/editor.html'
const tabsData = new Map()
const partialContents = new Map()
const EDITOR_URL = browser.runtime.getURL(EDITOR_PAGE_URL)

export { onMessage, onTabRemoved, isEditor, open, EDITOR_URL }

async function open({ tabIndex, content, filename }) {
  try {
    const { _id } = await createNewSnapshot(content)
    if (_id) {
      const createTabProperties = { active: true, url: `${EDITOR_PAGE_URL}?id=${_id}` }
      if (tabIndex != null) {
        createTabProperties.index = tabIndex
      }
      const tab = await browser.tabs.create(createTabProperties)
      tabsData.set(tab.id, { content, filename })
    } else {
      onServerError()
    }
  } catch (e) {
    onServerError()
  }
}

async function createNewSnapshot(content) {
  const formData = new FormData()
  const { url } = content.match(/url: (?<url>.+) \n saved date/).groups

  formData.append('file', new Blob([content], { type: 'text/html' }))
  formData.append('name', 'untitled snapshot')
  formData.append('domain', url)

  const response = await fetch(`${extensionConfig.SERVER_URL}/snapshots`, {
    method: 'POST',
    body: formData,
  })
  return response.json()
}

const onServerError = async () => {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  ui.onError(tab.id, 'Unable to save snapshot on server. Please try again', 'no-link')
}

function onTabRemoved(tabId) {
  tabsData.delete(tabId)
}

function isEditor(tab) {
  return !!tab.url.match(EDITOR_URL)
}

async function onMessage(message, sender) {
  if (message.method.endsWith('.getTabData')) {
    const { tab } = sender
    const tabData = tabsData.get(tab.id)
    if (tabData) {
      const options = await config.getOptions(tabData.url)
      const content = JSON.stringify(tabData)
      for (let blockIndex = 0; blockIndex * MAX_CONTENT_SIZE < content.length; blockIndex++) {
        const message = {
          method: 'editor.setTabData',
          tabId: tab.id,
        }
        message.truncated = content.length > MAX_CONTENT_SIZE
        message.url = tabData.url
        if (message.truncated) {
          message.finished = (blockIndex + 1) * MAX_CONTENT_SIZE > content.length
          message.content = content.substring(
            blockIndex * MAX_CONTENT_SIZE,
            (blockIndex + 1) * MAX_CONTENT_SIZE
          )
        } else {
          message.content = content
          message.options = options
        }
        await browser.tabs.sendMessage(tab.id, message)
      }
    } else {
      const message = {
        method: 'editor.setTabData',
        tabId: tab.id,
      }
      await browser.tabs.sendMessage(tab.id, message)
    }
  }
  if (message.method.endsWith('.open')) {
    let contents
    const { tab } = sender
    if (message.truncated) {
      contents = partialContents.get(tab.id)
      if (!contents) {
        contents = []
        partialContents.set(tab.id, contents)
      }
      contents.push(message.content)
      if (message.finished) {
        partialContents.delete(tab.id)
      }
    } else if (message.content) {
      contents = [message.content]
    }
    if (!message.truncated || message.finished) {
      const updateTabProperties = { url: EDITOR_PAGE_URL }
      await browser.tabs.update(tab.id, updateTabProperties)
      tabsData.set(tab.id, { url: tab.url, content: contents.join(''), filename: message.filename })
    }
  }
  if (message.method.endsWith('.isEditor')) {
    return isEditor(message.tab)
  }
  return {}
}
