

/* global browser, globalThis, document */

import * as config from './config.js'
import * as editor from './editor.js'
import * as ui from '../../ui/bg/index.js'

const ERROR_CONNECTION_ERROR_CHROMIUM =
  'Could not establish connection. Receiving end does not exist.'
const ERROR_CONNECTION_LOST_CHROMIUM = 'The message port closed before a response was received.'
const ERROR_CONNECTION_LOST_GECKO = 'Message manager disconnected'
const ERROR_EDITOR_PAGE_CHROMIUM = 'Cannot access contents of url '
const INJECT_SCRIPTS_STEP = 1
const EXECUTE_SCRIPTS_STEP = 2
const TASK_PENDING_STATE = 'pending'
const TASK_PROCESSING_STATE = 'processing'
const CONTENT_SCRIPTS = [
  'single-file/chrome-browser-polyfill.js',
  'single-file/single-file-bootstrap.js',
  'single-file/extension-bootstrap.js',
  'single-file/web/infobar-web.js',
  'single-file/single-file.js',
  'single-file/infobar.js',
  'single-file/extension.js',
]

const tasks = []
let currentTaskId = 0
let maxParallelWorkers
ui.init({ isSavingTab, saveTabs, saveUrls, cancelTab, openEditor, saveSelectedLinks })

export {
  saveTabs,
  saveUrls,
  cancelTask,
  cancelAllTasks,
  getTasksInfo,
  getTaskInfo,
  setCancelCallback,
  onSaveEnd,
  onInit,
  cancelTab as onTabRemoved,
}

async function saveSelectedLinks(tab) {
  const scriptsInjected = await injectScripts(tab.id)
  if (scriptsInjected) {
    const response = await browser.tabs.sendMessage(tab.id, { method: 'content.getSelectedLinks' })
    if (response.urls && response.urls.length) {
      await saveUrls(response.urls)
    }
  } else {
    ui.onForbiddenDomain(tab)
  }
}

async function saveUrls(urls, options = {}) {
  await initMaxParallelWorkers()
  await Promise.all(
    urls.map(async (url) => {
      const tabOptions = await config.getOptions(url)
      Object.keys(options).forEach((key) => (tabOptions[key] = options[key]))
      tabOptions.autoClose = true
      addTask({
        tab: { url },
        status: TASK_PENDING_STATE,
        options: tabOptions,
        method: 'content.save',
      })
    })
  )
  runTasks()
}

async function saveTabs(tabs, options = {}) {
  await initMaxParallelWorkers()
  try {
    await Promise.all(
      tabs.map(async (tab) => {
        const tabId = tab.id
        const tabOptions = await config.getOptions(tab.url)
        Object.keys(options).forEach((key) => (tabOptions[key] = options[key]))
        tabOptions.tabId = tabId
        tabOptions.tabIndex = tab.index
        ui.onStart(tabId, INJECT_SCRIPTS_STEP)
        const scriptsInjected = await injectScripts(tab.id, options)
        if (scriptsInjected || editor.isEditor(tab)) {
          ui.onStart(tabId, EXECUTE_SCRIPTS_STEP)
          addTask({
            status: TASK_PENDING_STATE,
            tab,
            options: tabOptions,
            method: 'content.save',
          })
        } else {
          ui.onForbiddenDomain(tab)
        }
      })
    )
  } catch (e) {
    ui.onForbiddenDomain(tabs[0])
  }

  runTasks()
}

function addTask(info) {
  const taskInfo = {
    id: currentTaskId,
    status: info.status,
    tab: info.tab,
    options: info.options,
    method: info.method,
    done() {
      tasks.splice(
        tasks.findIndex((taskInfo) => taskInfo.id == this.id),
        1
      )
      runTasks()
    },
  }
  tasks.push(taskInfo)
  currentTaskId++
  return taskInfo
}

function openEditor(tab) {
  browser.tabs.sendMessage(tab.id, { method: 'content.openEditor' })
}

async function initMaxParallelWorkers() {
  if (!maxParallelWorkers) {
    maxParallelWorkers = (await config.get()).maxParallelWorkers
  }
}

function runTasks() {
  const processingCount = tasks.filter(
    (taskInfo) => taskInfo.status == TASK_PROCESSING_STATE
  ).length
  for (
    let index = 0;
    index < Math.min(tasks.length - processingCount, maxParallelWorkers - processingCount);
    index++
  ) {
    const taskInfo = tasks.find((taskInfo) => taskInfo.status == TASK_PENDING_STATE)
    if (taskInfo) {
      runTask(taskInfo)
    }
  }
}

async function runTask(taskInfo) {
  const taskId = taskInfo.id
  taskInfo.status = TASK_PROCESSING_STATE
  if (!taskInfo.tab.id) {
    let scriptsInjected
    try {
      const tab = await createTabAndWaitUntilComplete({ url: taskInfo.tab.url, active: false })
      taskInfo.tab.id = taskInfo.options.tabId = tab.id
      taskInfo.tab.index = taskInfo.options.tabIndex = tab.index
      ui.onStart(taskInfo.tab.id, INJECT_SCRIPTS_STEP)
      scriptsInjected = await injectScripts(tab.id, taskInfo.options)
    } catch (tabId) {
      taskInfo.tab.id = tabId
    }
    if (scriptsInjected) {
      ui.onStart(taskInfo.tab.id, EXECUTE_SCRIPTS_STEP)
    } else {
      taskInfo.done()
      return
    }
  }
  taskInfo.options.taskId = taskId
  try {
    await browser.tabs.sendMessage(taskInfo.tab.id, {
      method: taskInfo.method,
      options: taskInfo.options,
    })
  } catch (error) {
    if (error && (!error.message || !isIgnoredError(error))) {
      console.log(error.message ? error.message : error) // eslint-disable-line no-console
      ui.onError(taskInfo.tab.id, error.message, error.link)
      taskInfo.done()
    }
  }
}

function isIgnoredError(error) {
  return (
    error.message == ERROR_CONNECTION_LOST_CHROMIUM ||
    error.message == ERROR_CONNECTION_ERROR_CHROMIUM ||
    error.message == ERROR_CONNECTION_LOST_GECKO ||
    error.message.startsWith(ERROR_EDITOR_PAGE_CHROMIUM + JSON.stringify(editor.EDITOR_URL))
  )
}

function isSavingTab(tab) {
  return Boolean(tasks.find((taskInfo) => taskInfo.tab.id == tab.id))
}

function onInit(tab) {
  cancelTab(tab.id)
}

function onSaveEnd(taskId) {
  const taskInfo = tasks.find((taskInfo) => taskInfo.id == taskId)
  if (taskInfo) {
    if (taskInfo.options.autoClose && !taskInfo.cancelled) {
      browser.tabs.remove(taskInfo.tab.id)
    }
    taskInfo.done()
  }
}

async function injectScripts(tabId, options = {}) {
  let scriptsInjected
  const resultData = (
    await browser.scripting.executeScript({
      target: { tabId },
      func: () => Boolean(globalThis.singlefile),
    })
  )[0]
  scriptsInjected = resultData && resultData.result
  if (!scriptsInjected) {
    try {
      await browser.scripting.executeScript({
        target: { tabId },
        files: CONTENT_SCRIPTS,
      })
      scriptsInjected = true
    } catch (error) {
      // ignored
    }
  }
  if (scriptsInjected && options.frameId) {
    await browser.scripting.executeScript({
      target: {
        tabId,
        frameIds: [options.frameId],
      },
      func: () => (document.documentElement.dataset.requestedFrameId = true),
    })
  }
  return scriptsInjected
}

async function createTabAndWaitUntilComplete(createProperties) {
  const tab = await browser.tabs.create(createProperties)
  return new Promise((resolve, reject) => {
    browser.tabs.onUpdated.addListener(onTabUpdated)
    browser.tabs.onRemoved.addListener(onTabRemoved)

    function onTabUpdated(tabId, changeInfo) {
      if (tabId == tab.id && changeInfo.status == 'complete') {
        resolve(tab)
        browser.tabs.onUpdated.removeListener(onTabUpdated)
        browser.tabs.onRemoved.removeListener(onTabRemoved)
      }
    }

    function onTabRemoved(tabId) {
      if (tabId == tab.id) {
        reject(tabId)
        browser.tabs.onRemoved.removeListener(onTabRemoved)
      }
    }
  })
}

function setCancelCallback(taskId, cancelCallback) {
  const taskInfo = tasks.find((taskInfo) => taskInfo.id == taskId)
  if (taskInfo) {
    taskInfo.cancel = cancelCallback
  }
}

function cancelTab(tabId) {
  Array.from(tasks)
    .filter((taskInfo) => taskInfo.tab.id == tabId)
    .forEach(cancel)
}

function cancelTask(taskId) {
  cancel(tasks.find((taskInfo) => taskInfo.id == taskId))
}

function cancelAllTasks() {
  Array.from(tasks).forEach(cancel)
}

function getTasksInfo() {
  return tasks.map(mapTaskInfo)
}

function getTaskInfo(taskId) {
  return tasks.find((taskInfo) => taskInfo.id == taskId)
}

function cancel(taskInfo) {
  const tabId = taskInfo.tab.id
  taskInfo.cancelled = true
  browser.tabs.sendMessage(tabId, {
    method: 'content.cancelSave',
    options: {
      loadDeferredImages: taskInfo.options.loadDeferredImages,
      loadDeferredImagesKeepZoomLevel: taskInfo.options.loadDeferredImagesKeepZoomLevel,
    },
  })
  if (taskInfo.cancel) {
    taskInfo.cancel()
  }
  ui.onCancelled(taskInfo.tab)
  taskInfo.done()
}

function mapTaskInfo(taskInfo) {
  return {
    id: taskInfo.id,
    tabId: taskInfo.tab.id,
    index: taskInfo.tab.index,
    url: taskInfo.tab.url,
    title: taskInfo.tab.title,
    cancelled: taskInfo.cancelled,
    status: taskInfo.status,
  }
}
