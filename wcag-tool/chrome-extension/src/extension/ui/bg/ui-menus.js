/* global browser, URL */

import * as config from '../../core/bg/config.js'
import * as tabsData from '../../core/bg/tabs-data.js'
import { getMessages } from '../../core/bg/i18n.js'

const menus = browser.contextMenus
const BROWSER_MENUS_API_SUPPORTED =
  menus && menus.onClicked && menus.create && menus.update && menus.removeAll
const MENU_ID_EDIT_AND_SAVE_PAGE = 'edit-and-save-page'
const MENU_ID_SAVE_SELECTED_LINKS = 'save-selected-links'
const MENU_ID_ASSOCIATE_WITH_PROFILE = 'associate-with-profile'
const MENU_ID_SAVE_SELECTED = 'save-selected'
const MENU_ID_SAVE_FRAME = 'save-frame'
let MENU_EDIT_AND_SAVE_PAGE_MESSAGE
const MENU_TOP_VISIBLE_ENTRIES = [
  MENU_ID_EDIT_AND_SAVE_PAGE,
  MENU_ID_SAVE_SELECTED_LINKS,
  MENU_ID_SAVE_SELECTED,
  MENU_ID_SAVE_FRAME,
  MENU_ID_ASSOCIATE_WITH_PROFILE,
]

const menusTitleState = new Map()
let contextMenuVisibleState = true
let allMenuVisibleState = true
let menusCreated
let pendingRefresh
let business
Promise.resolve().then(initialize)
export {
  onMessage,
  refreshTab as onTabCreated,
  refreshTab as onTabActivated,
  refreshTab as onInit,
  createMenus as refreshTab,
  init,
}

async function init(businessApi) {
  business = businessApi
  const messages = await getMessages()
  MENU_EDIT_AND_SAVE_PAGE_MESSAGE = messages.menuEditAndSavePage.message
}

function onMessage(message) {
  if (message.method.endsWith('refreshMenu')) {
    createMenus()
    return Promise.resolve({})
  }
  return undefined
}

async function createMenus(tab) {
  const options = await config.getOptions(tab && tab.url)
  if (BROWSER_MENUS_API_SUPPORTED && options) {
    const pageContextsEnabled = ['page', 'frame', 'image', 'link', 'video', 'audio', 'selection']
    const defaultContextsDisabled = []
    if (options.browserActionMenuEnabled) {
      defaultContextsDisabled.push('browser_action')
    }
    if (options.tabMenuEnabled) {
      try {
        menus.create({
          id: 'temporary-id',
          contexts: ['tab'],
          title: 'title',
        })
        defaultContextsDisabled.push('tab')
      } catch (error) {
        options.tabMenuEnabled = false
      }
    }
    await menus.removeAll()
    const defaultContextsEnabled = defaultContextsDisabled.concat(...pageContextsEnabled)
    const defaultContexts = options.contextMenuEnabled
      ? defaultContextsEnabled
      : defaultContextsDisabled
    menus.create({
      id: MENU_ID_EDIT_AND_SAVE_PAGE,
      contexts: defaultContexts,
      title: MENU_EDIT_AND_SAVE_PAGE_MESSAGE,
    })
  }
  menusCreated = true
  if (pendingRefresh) {
    pendingRefresh = false
    ;(await browser.tabs.query({})).forEach(async (tab) => await refreshTab(tab))
  }
}

async function initialize() {
  if (BROWSER_MENUS_API_SUPPORTED) {
    createMenus()
    menus.onClicked.addListener(async (event, tab) => {
      if (event.menuItemId === MENU_ID_EDIT_AND_SAVE_PAGE) {
        const allTabsData = await tabsData.get(tab.id)
        if (allTabsData[tab.id].savedPageDetected) {
          business.openEditor(tab)
        } else if (event.linkUrl) {
          business.saveUrls([event.linkUrl], { openEditor: true })
        } else {
          business.saveTabs([tab], { openEditor: true })
        }
      }
    })
    if (menusCreated) {
      pendingRefresh = true
    } else {
      ;(await browser.tabs.query({})).forEach(async (tab) => await refreshTab(tab))
    }
  }
}

async function refreshTab(tab) {
  if (BROWSER_MENUS_API_SUPPORTED && menusCreated) {
    const promises = []
    const allTabsData = await tabsData.get(tab.id)
    if (allTabsData[tab.id].editorDetected) {
      updateAllVisibleValues(false)
    } else {
      updateAllVisibleValues(true)
      if (tab && tab.url) {
        const options = await config.getOptions(tab.url)
        promises.push(updateVisibleValue(tab, options.contextMenuEnabled))
        promises.push(updateTitleValue(MENU_ID_EDIT_AND_SAVE_PAGE, MENU_EDIT_AND_SAVE_PAGE_MESSAGE))
        promises.push(
          menus.update(MENU_ID_EDIT_AND_SAVE_PAGE, {
            visible: !options.openEditor || allTabsData[tab.id].savedPageDetected,
          })
        )
      }
      await Promise.all(promises)
    }
  }

  async function updateAllVisibleValues(visible) {
    const lastVisibleState = allMenuVisibleState
    allMenuVisibleState = visible
    if (lastVisibleState === undefined || lastVisibleState !== visible) {
      const promises = []
      try {
        MENU_TOP_VISIBLE_ENTRIES.forEach((id) => promises.push(menus.update(id, { visible })))
        await Promise.all(promises)
      } catch (error) {
        // ignored
      }
    }
  }

  async function updateVisibleValue(tab, visible) {
    const lastVisibleState = contextMenuVisibleState
    contextMenuVisibleState = visible
    if (lastVisibleState === undefined || lastVisibleState !== visible) {
      await createMenus(tab)
    }
  }

  function updateTitleValue(id, title) {
    const lastTitleValue = menusTitleState.get(id)
    menusTitleState.set(id, title)
    if (lastTitleValue === undefined) {
      return menus.update(id, { title })
    }
    if (lastTitleValue !== title) {
      return menus.update(id, { title })
    }
    return undefined
  }
}
