

/* global browser, setTimeout */

let persistentData
let temporaryData
let cleanedUp
setTimeout(() => getPersistent().then((tabsData) => (persistentData = tabsData)), 0)
export { onMessage, getTemporary, getPersistent as get, setPersistent as set, remove }

function onMessage(message) {
  if (message.method.endsWith('.get')) {
    return getPersistent()
  }
  if (message.method.endsWith('.set')) {
    return setPersistent(message.tabsData)
  }
}

async function remove(tabId) {
  if (temporaryData) {
    delete temporaryData[tabId]
  }
  const tabsData = await getPersistent()
  if (tabsData[tabId]) {
    tabsData[tabId] = {}
    await setPersistent(tabsData)
  }
}

function getTemporary(desiredTabId) {
  if (!temporaryData) {
    temporaryData = {}
  }
  if (desiredTabId !== undefined && !temporaryData[desiredTabId]) {
    temporaryData[desiredTabId] = {}
  }
  return temporaryData
}

async function getPersistent(desiredTabId) {
  if (!persistentData) {
    const config = await browser.storage.local.get()
    persistentData = config.tabsData || {}
  }
  cleanup()
  if (desiredTabId !== undefined && !persistentData[desiredTabId]) {
    persistentData[desiredTabId] = {}
  }
  return persistentData
}

async function setPersistent(tabsData) {
  persistentData = tabsData
  await browser.storage.local.set({ tabsData })
}

async function cleanup() {
  if (!cleanedUp) {
    cleanedUp = true
    const tabs = await browser.tabs.query({ currentWindow: true, highlighted: true })
    Object.keys(persistentData)
      .filter((key) => {
        if (key != 'profileName') {
          return !tabs.find((tab) => tab.id == key)
        }
      })
      .forEach((tabId) => delete persistentData[tabId])
    await browser.storage.local.set({ tabsData: persistentData })
  }
}
