/* global browser */

import * as button from './ui-button.js'
import * as menus from './ui-menus.js'

export {
  onMessage,
  refreshTab,
  onForbiddenDomain,
  onStart,
  onError,
  onEdit,
  onEnd,
  onCancelled,
  onUploadProgress,
  onTabCreated,
  onTabActivated,
  onInit,
  init,
}

function init(businessApi) {
  menus.init(businessApi)
  button.init(businessApi)
}

function onMessage(message, sender) {
  if (message.method.endsWith('.refreshMenu')) {
    return menus.onMessage(message, sender)
  }
  return button.onMessage(message, sender)
}

async function refreshTab(tab) {
  return Promise.all([menus.refreshTab(tab), button.refreshTab(tab)])
}

function onForbiddenDomain(tab) {
  button.onForbiddenDomain(tab)
}

function onStart(tabId, step) {
  button.onStart(tabId, step)
}

async function onError(tabId, message, link) {
  button.onError(tabId)
  if (message) {
    await browser.tabs.sendMessage(tabId, {
      method: 'content.error',
      error: message.toString(),
      link,
    })
  }
}

function onEdit(tabId) {
  button.onEdit(tabId)
}

function onEnd(tabId) {
  button.onEnd(tabId)
}

function onCancelled(tabId) {
  button.onCancelled(tabId)
}

function onUploadProgress(tabId, index, maxIndex) {
  button.onUploadProgress(tabId, index, maxIndex)
}

function onTabCreated(tab) {
  menus.onTabCreated(tab)
}

function onTabActivated(tab) {
  menus.onTabActivated(tab)
}

function onInit(tab) {
  menus.onInit(tab)
}
