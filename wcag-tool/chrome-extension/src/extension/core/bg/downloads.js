/* global browser, Blob */

import * as business from './business.js'
import * as editor from './editor.js'
import * as ui from '../../ui/bg/index.js'
import config from '../../../../config'

const partialContents = new Map()

export { onMessage }

async function onMessage(message, sender) {
  if (message.method.endsWith('.download')) {
    return downloadTabPage(message, sender.tab)
  }
  if (message.method.endsWith('.end')) {
    business.onSaveEnd(message.taskId)
    return {}
  }
  if (message.method.endsWith('.getInfo')) {
    return business.getTasksInfo()
  }
  if (message.method.endsWith('.cancel')) {
    business.cancelTask(message.taskId)
    return {}
  }
  if (message.method.endsWith('.cancelAll')) {
    business.cancelAllTasks()
    return {}
  }
  if (message.method.endsWith('.saveUrls')) {
    business.saveUrls(message.urls)
    return {}
  }
  if (message.method.endsWith('.downloadSnapshot')) {
    return fetchSnapshot(message.snapshotId, message.filename, message.tab)
  }
}

const onServerError = async (message) => {
  const [tab] = await browser.tabs.query({ currentWindow: true, active: true })
  ui.onError(tab.id, message, 'no-link')
}

async function fetchSnapshot(snapshotId, filename, tab) {
  const errorMessage = 'Unable to fetch snapshot from server. Please try again'
  ui.onStart(tab.id, 1)
  try {
    const response = await fetch(`${config.SERVER_URL}/snapshots/${snapshotId}/file`)
    if (response.ok) {
      const snapshotContent = await response.text()
      const message = {
        openEditor: true,
        content: snapshotContent,
        filename,
        snapshotId,
      }
      await downloadTabPage(message, tab)
    } else {
      onServerError(errorMessage)
    }
  } catch (e) {
    onServerError(errorMessage)
  }
  return {}
}

async function postNewSnapshot(content) {
  const formData = new FormData()
  const { url } = content.match(/url: (?<url>.+) \n saved date/).groups

  formData.append('file', new Blob([content], { type: 'text/html' }))
  formData.append('name', 'untitled snapshot')
  formData.append('domain', url)

  const response = await fetch(`${config.SERVER_URL}/snapshots`, {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) {
    throw new Error()
  }
  return response.json()
}

async function downloadTabPage(message, tab) {
  let contents
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
    if (!message.snapshotId) {
      try {
        const { _id } = await postNewSnapshot(contents.join(''))
        message.snapshotId = _id
      } catch (e) {
        onServerError('Unable to save snapshot on server. Please try again')
      }
    }
    if (message.openEditor && message.snapshotId) {
      ui.onEdit(tab.id)
      await editor.open({
        tabIndex: tab.index + 1,
        filename: message.filename,
        content: contents.join(''),
        snapshotId: message.snapshotId,
      })
    }
  }
  return {}
}
