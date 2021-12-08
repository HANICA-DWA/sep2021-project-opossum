

/* global browser, setTimeout */

import * as config from './config.js'
import * as business from './business.js'
import * as editor from './editor.js'
import * as tabsData from './tabs-data.js'
import * as ui from '../../ui/bg/index.js'
import { onPromptValueResponse } from './tabs-util.js'

const DELAY_MAYBE_INIT = 1500

browser.tabs.onCreated.addListener((tab) => onTabCreated(tab))
browser.tabs.onActivated.addListener((activeInfo) => onTabActivated(activeInfo))
browser.tabs.onRemoved.addListener((tabId) => onTabRemoved(tabId))
browser.tabs.onUpdated.addListener((tabId, changeInfo) => onTabUpdated(tabId, changeInfo))
export { onMessage }

async function onMessage(message, sender) {
  if (message.method.endsWith('.init')) {
    await onInit(sender.tab, message)
    ui.onInit(sender.tab)
    business.onInit(sender.tab)
  }
  if (message.method.endsWith('.promptValueResponse')) {
    onPromptValueResponse(message, sender)
  }
  if (message.method.endsWith('.getOptions')) {
    return config.getOptions(message.url)
  }
  if (message.method.endsWith('.activate')) {
    await browser.tabs.update(message.tabId, { active: true })
  }
  if (message.method.endsWith('.snapshot')) {
    return business.saveTabs([message.tab], { openEditor: true })
  }
}

async function onInit(tab, options) {
  await tabsData.remove(tab.id)
  const allTabsData = await tabsData.get(tab.id)
  allTabsData[tab.id].savedPageDetected = options.savedPageDetected
  await tabsData.set(allTabsData)
}

async function onTabUpdated(tabId, changeInfo) {
  if (changeInfo.status == 'complete') {
    setTimeout(async () => {
      try {
        await browser.tabs.sendMessage(tabId, { method: 'content.maybeInit' })
      } catch (error) {
        // ignored
      }
    }, DELAY_MAYBE_INIT)
    const tab = await browser.tabs.get(tabId)
    if (editor.isEditor(tab)) {
      const allTabsData = await tabsData.get(tab.id)
      allTabsData[tab.id].editorDetected = true
      await tabsData.set(allTabsData)
      ui.onTabActivated(tab)
    }
  }
}

function onTabCreated(tab) {
  ui.onTabCreated(tab)
}

async function onTabActivated(activeInfo) {
  const tab = await browser.tabs.get(activeInfo.tabId)
  ui.onTabActivated(tab)
}

function onTabRemoved(tabId) {
  tabsData.remove(tabId)
  editor.onTabRemoved(tabId)
  business.onTabRemoved(tabId)
}
