/* global browser */

import { queryTabs } from '../../core/bg/tabs-util.js'
import * as tabsData from '../../core/bg/tabs-data.js'
import { getMessages } from '../../core/bg/i18n.js'

const DEFAULT_ICON_PATH = 'icon.png'
// const WAIT_ICON_PATH_PREFIX = '/extension/ui/resources/icon_128_wait'
const BUTTON_DEFAULT_BADGE_MESSAGE = ''
let BUTTON_DEFAULT_TOOLTIP_MESSAGE
let BUTTON_BLOCKED_TOOLTIP_MESSAGE
let BUTTON_INITIALIZING_BADGE_MESSAGE
let BUTTON_INITIALIZING_TOOLTIP_MESSAGE
let BUTTON_ERROR_BADGE_MESSAGE
let BUTTON_BLOCKED_BADGE_MESSAGE
let BUTTON_OK_BADGE_MESSAGE
let BUTTON_SAVE_PROGRESS_TOOLTIP_MESSAGE
let BUTTON_UPLOAD_PROGRESS_TOOLTIP_MESSAGE
const DEFAULT_COLOR = [2, 147, 20, 192]
const ACTIVE_COLOR = [4, 229, 36, 192]
const FORBIDDEN_COLOR = [255, 255, 255, 1]
const ERROR_COLOR = [229, 4, 12, 192]
const INJECT_SCRIPTS_STEP = 1

let BUTTON_STATES

let business

browser.action.onClicked.addListener(async (tab) => {
  const highlightedTabs = await queryTabs({ currentWindow: true, highlighted: true })
  if (highlightedTabs.length <= 1) {
    toggleSaveTab(tab)
  } else {
    business.saveTabs(highlightedTabs)
  }

  function toggleSaveTab(tab) {
    if (business.isSavingTab(tab)) {
      business.cancelTab(tab.id)
    } else {
      business.saveTabs([tab])
    }
  }
})

export {
  onMessage,
  onStart,
  onUploadProgress,
  onForbiddenDomain,
  onError,
  onEdit,
  onEnd,
  onCancelled,
  refreshTab,
  init,
}

async function init(businessApi) {
  business = businessApi
  const messages = await getMessages()
  BUTTON_DEFAULT_TOOLTIP_MESSAGE = messages.buttonDefaultTooltip.message
  BUTTON_BLOCKED_TOOLTIP_MESSAGE = messages.buttonBlockedTooltip.message
  BUTTON_INITIALIZING_BADGE_MESSAGE = messages.buttonInitializingBadge.message
  BUTTON_INITIALIZING_TOOLTIP_MESSAGE = messages.buttonInitializingTooltip.message
  BUTTON_ERROR_BADGE_MESSAGE = messages.buttonErrorBadge.message
  BUTTON_BLOCKED_BADGE_MESSAGE = messages.buttonBlockedBadge.message
  BUTTON_OK_BADGE_MESSAGE = messages.buttonOKBadge.message
  BUTTON_SAVE_PROGRESS_TOOLTIP_MESSAGE = messages.buttonSaveProgressTooltip.message
  BUTTON_UPLOAD_PROGRESS_TOOLTIP_MESSAGE = messages.buttonUploadProgressTooltip.message
  BUTTON_STATES = {
    default: {
      setBadgeBackgroundColor: { color: DEFAULT_COLOR },
      setBadgeText: { text: BUTTON_DEFAULT_BADGE_MESSAGE },
      setTitle: { title: BUTTON_DEFAULT_TOOLTIP_MESSAGE },
      setIcon: { path: DEFAULT_ICON_PATH },
    },
    inject: {
      setBadgeBackgroundColor: { color: DEFAULT_COLOR },
      setBadgeText: { text: BUTTON_INITIALIZING_BADGE_MESSAGE },
      setTitle: { title: BUTTON_INITIALIZING_TOOLTIP_MESSAGE },
    },
    execute: {
      setBadgeBackgroundColor: { color: ACTIVE_COLOR },
      setBadgeText: { text: BUTTON_INITIALIZING_BADGE_MESSAGE },
    },
    progress: {
      setBadgeBackgroundColor: { color: ACTIVE_COLOR },
      setBadgeText: { text: BUTTON_DEFAULT_BADGE_MESSAGE },
    },
    edit: {
      setBadgeBackgroundColor: { color: DEFAULT_COLOR },
      setBadgeText: { text: BUTTON_DEFAULT_BADGE_MESSAGE },
      setTitle: { title: BUTTON_DEFAULT_TOOLTIP_MESSAGE },
      setIcon: { path: DEFAULT_ICON_PATH },
    },
    end: {
      setBadgeBackgroundColor: { color: ACTIVE_COLOR },
      setBadgeText: { text: BUTTON_OK_BADGE_MESSAGE },
      setTitle: { title: BUTTON_DEFAULT_TOOLTIP_MESSAGE },
      setIcon: { path: DEFAULT_ICON_PATH },
    },
    error: {
      setBadgeBackgroundColor: { color: ERROR_COLOR },
      setBadgeText: { text: BUTTON_ERROR_BADGE_MESSAGE },
      setTitle: { title: BUTTON_DEFAULT_BADGE_MESSAGE },
      setIcon: { path: DEFAULT_ICON_PATH },
    },
    forbidden: {
      setBadgeBackgroundColor: { color: FORBIDDEN_COLOR },
      setBadgeText: { text: BUTTON_BLOCKED_BADGE_MESSAGE },
      setTitle: { title: BUTTON_BLOCKED_TOOLTIP_MESSAGE },
      setIcon: { path: DEFAULT_ICON_PATH },
    },
  }
}

function onMessage(message, sender) {
  if (message.method.endsWith('.processInit')) {
    const allTabsData = tabsData.getTemporary(sender.tab.id)
    delete allTabsData[sender.tab.id].button
    refreshTab(sender.tab)
  }
  if (message.method.endsWith('.processProgress')) {
    if (message.maxIndex) {
      onSaveProgress(sender.tab.id, message.index, message.maxIndex)
    }
  }
  if (message.method.endsWith('.processEnd')) {
    onEnd(sender.tab.id)
  }
  if (message.method.endsWith('.processError')) {
    if (message.error) {
      console.error('Initialization error', message.error) // eslint-disable-line no-console
    }
    onError(sender.tab.id)
  }
  if (message.method.endsWith('.processCancelled')) {
    onCancelled(sender.tab)
  }
  return Promise.resolve({})
}

function onStart(tabId, step) {
  const state = step === INJECT_SCRIPTS_STEP ? getButtonState('inject') : getButtonState('execute')
  state.setTitle = { title: `${BUTTON_INITIALIZING_TOOLTIP_MESSAGE} (${step}/2)` }
  // state.setIcon = { path: WAIT_ICON_PATH_PREFIX + "0.png" };
  refresh(tabId, state)
}

function onError(tabId) {
  refresh(tabId, getButtonState('error'))
}

function onEdit(tabId) {
  refresh(tabId, getButtonState('edit'))
}

function onEnd(tabId) {
  refresh(tabId, getButtonState('end'))
}

function onForbiddenDomain(tab) {
  refresh(tab.id, getButtonState('forbidden'))
}

function onCancelled(tab) {
  refreshTab(tab)
}

function onSaveProgress(tabId, index, maxIndex) {
  onProgress(tabId, index, maxIndex, BUTTON_SAVE_PROGRESS_TOOLTIP_MESSAGE)
}

function onUploadProgress(tabId, index, maxIndex) {
  onProgress(tabId, index, maxIndex, BUTTON_UPLOAD_PROGRESS_TOOLTIP_MESSAGE)
}

function onProgress(tabId, index, maxIndex, tooltipMessage) {
  const progress = Math.max(Math.min(20, Math.floor((index / maxIndex) * 20)), 0)
  // const barProgress = Math.min(Math.floor((index / maxIndex) * 8), 8)
  // const path = `${WAIT_ICON_PATH_PREFIX + barProgress}.png`
  const state = getButtonState('progress')
  state.setTitle = { title: `${tooltipMessage + progress * 5}%` }
  // state.setIcon = { path };
  refresh(tabId, state)
}

async function refreshTab(tab) {
  const state = getButtonState('default')
  await refresh(tab.id, state)
}

async function refresh(tabId, state) {
  const allTabsData = tabsData.getTemporary(tabId)
  if (state) {
    if (!allTabsData[tabId].button) {
      allTabsData[tabId].button = { lastState: null }
    }
    const lastState = allTabsData[tabId].button.lastState || {}
    const newState = {}
    Object.keys(state).forEach((property) => {
      if (
        state[property] !== undefined &&
        JSON.stringify(lastState[property]) !== JSON.stringify(state[property])
      ) {
        newState[property] = state[property]
      }
    })
    if (Object.keys(newState).length) {
      allTabsData[tabId].button.lastState = state
      await refreshAsync(tabId, newState)
    }
  }
}

async function refreshAsync(tabId, state) {
  for (const browserActionMethod of Object.keys(state)) {
    await refreshProperty(tabId, browserActionMethod, state[browserActionMethod])
  }
}

async function refreshProperty(tabId, browserActionMethod, browserActionParameter) {
  if (browser.action[browserActionMethod]) {
    const parameter = JSON.parse(JSON.stringify(browserActionParameter))
    parameter.tabId = tabId
    await browser.action[browserActionMethod](parameter)
  }
}

function getButtonState(name) {
  return JSON.parse(JSON.stringify(BUTTON_STATES[name]))
}