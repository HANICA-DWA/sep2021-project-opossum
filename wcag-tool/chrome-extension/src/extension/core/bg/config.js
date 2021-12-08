

/* global browser, navigator, URL, Blob */

import { download } from './download-util.js'
import * as tabsData from './tabs-data.js'

const CURRENT_PROFILE_NAME = '-'
const DEFAULT_PROFILE_NAME = '__Default_Settings__'
const DISABLED_PROFILE_NAME = '__Disabled_Settings__'
const REGEXP_RULE_PREFIX = 'regexp:'
const BACKGROUND_SAVE_DEFAULT = !/Mobile.*Firefox/.test(navigator.userAgent)

const DEFAULT_CONFIG = {
  removeHiddenElements: true,
  removeUnusedStyles: true,
  removeUnusedFonts: true,
  removeFrames: false,
  removeImports: true,
  removeScripts: true,
  compressHTML: true,
  compressCSS: false,
  loadDeferredImages: true,
  loadDeferredImagesMaxIdleTime: 1500,
  loadDeferredImagesBlockCookies: false,
  loadDeferredImagesBlockStorage: false,
  loadDeferredImagesKeepZoomLevel: false,
  filenameTemplate: '{page-title} ({date-locale} {time-locale}).html',
  infobarTemplate: '',
  includeInfobar: false,
  confirmInfobarContent: false,
  autoClose: false,
  confirmFilename: false,
  filenameConflictAction: 'uniquify',
  filenameMaxLength: 192,
  filenameReplacedCharacters: [
    '~',
    '+',
    '\\\\',
    '?',
    '%',
    '*',
    ':',
    '|',
    '"',
    '<',
    '>',
    '\x00-\x1f',
    '\x7F',
  ],
  filenameReplacementCharacter: '_',
  contextMenuEnabled: true,
  tabMenuEnabled: true,
  browserActionMenuEnabled: true,
  shadowEnabled: true,
  logsEnabled: true,
  progressBarEnabled: true,
  maxResourceSizeEnabled: false,
  maxResourceSize: 10,
  removeAudioSrc: true,
  removeVideoSrc: true,
  displayInfobar: true,
  displayStats: false,
  backgroundSave: BACKGROUND_SAVE_DEFAULT,
  defaultEditorMode: 'normal',
  applySystemTheme: true,
  removeAlternativeFonts: true,
  removeAlternativeMedias: true,
  removeAlternativeImages: true,
  groupDuplicateImages: true,
  saveRawPage: false,
  saveToClipboard: false,
  addProof: false,
  saveToGDrive: false,
  saveToGitHub: false,
  githubToken: '',
  githubUser: '',
  githubRepository: 'SingleFile-Archives',
  githubBranch: 'main',
  saveWithCompanion: false,
  forceWebAuthFlow: false,
  extractAuthCode: true,
  resolveFragmentIdentifierURLs: false,
  userScriptEnabled: false,
  openEditor: false,
  openSavedPage: false,
  autoOpenEditor: false,
  saveCreatedBookmarks: false,
  allowedBookmarkFolders: [],
  ignoredBookmarkFolders: [],
  replaceBookmarkURL: true,
  saveFavicon: true,
  includeBOM: false,
  warnUnsavedPage: true,
  insertMetaNoIndex: false,
  insertMetaCSP: true,
  insertSingleFileComment: true,
  blockMixedContent: false,
  woleetKey: '',
}

let configStorage
const pendingUpgradePromise = upgrade()
export {
  DEFAULT_PROFILE_NAME,
  DISABLED_PROFILE_NAME,
  CURRENT_PROFILE_NAME,
  getConfig as get,
  getRule,
  getOptions,
  getProfiles,
  onMessage,
  updateRule,
  addRule,
  getAuthInfo,
  setAuthInfo,
  removeAuthInfo,
}

async function upgrade() {
  const { sync } = await browser.storage.local.get()
  if (sync) {
    configStorage = browser.storage.sync
  } else {
    configStorage = browser.storage.local
  }
  const config = await configStorage.get()
  if (!config.profiles) {
    const defaultConfig = config
    delete defaultConfig.tabsData
    applyUpgrade(defaultConfig)
    const newConfig = { profiles: {}, rules: [] }
    newConfig.profiles[DEFAULT_PROFILE_NAME] = defaultConfig
    configStorage.remove(Object.keys(DEFAULT_CONFIG))
    await configStorage.set(newConfig)
  } else {
    if (!config.rules) {
      config.rules = []
    }
    Object.keys(config.profiles).forEach((profileName) =>
      applyUpgrade(config.profiles[profileName])
    )
    await configStorage.remove(['profiles', 'defaultProfile', 'rules'])
    await configStorage.set({ profiles: config.profiles, rules: config.rules })
  }
  if (!config.maxParallelWorkers) {
    await configStorage.set({ maxParallelWorkers: navigator.hardwareConcurrency || 4 })
  }
}

function applyUpgrade(config) {
  Object.keys(DEFAULT_CONFIG).forEach((configKey) => upgradeConfig(config, configKey))
}

function upgradeOldConfig(config, newKey, oldKey) {
  // eslint-disable-line no-unused-vars
  if (config[newKey] === undefined && config[oldKey] !== undefined) {
    config[newKey] = config[oldKey]
    delete config[oldKey]
  }
}

function upgradeConfig(config, key) {
  if (config[key] === undefined) {
    config[key] = DEFAULT_CONFIG[key]
  }
}

async function getRule(url, ignoreWildcard) {
  const config = await getConfig()
  const regExpRules = config.rules.filter((rule) => testRegExpRule(rule))
  let rule = regExpRules
    .sort(sortRules)
    .find((rule) => url && url.match(new RegExp(rule.url.split(REGEXP_RULE_PREFIX)[1])))
  if (!rule) {
    const normalRules = config.rules.filter((rule) => !testRegExpRule(rule))
    rule = normalRules
      .sort(sortRules)
      .find((rule) => (!ignoreWildcard && rule.url == '*') || (url && url.includes(rule.url)))
  }
  return rule
}

async function getConfig() {
  await pendingUpgradePromise
  return configStorage.get(['profiles', 'rules', 'maxParallelWorkers'])
}

function sortRules(ruleLeft, ruleRight) {
  return ruleRight.url.length - ruleLeft.url.length
}

function testRegExpRule(rule) {
  return rule.url.toLowerCase().startsWith(REGEXP_RULE_PREFIX)
}

async function onMessage(message) {
  if (message.method.endsWith('.deleteRules')) {
    await deleteRules(message.profileName)
  }
  if (message.method.endsWith('.deleteRule')) {
    await deleteRule(message.url)
  }
  if (message.method.endsWith('.addRule')) {
    await addRule(message.url, message.profileName)
  }
  if (message.method.endsWith('.createProfile')) {
    await createProfile(message.profileName, message.fromProfileName || DEFAULT_PROFILE_NAME)
  }
  if (message.method.endsWith('.renameProfile')) {
    await renameProfile(message.profileName, message.newProfileName)
  }
  if (message.method.endsWith('.deleteProfile')) {
    await deleteProfile(message.profileName)
  }
  if (message.method.endsWith('.resetProfiles')) {
    await resetProfiles()
  }
  if (message.method.endsWith('.resetProfile')) {
    await resetProfile(message.profileName)
  }
  if (message.method.endsWith('.importConfig')) {
    await importConfig(message.config)
  }
  if (message.method.endsWith('.updateProfile')) {
    await updateProfile(message.profileName, message.profile)
  }
  if (message.method.endsWith('.updateRule')) {
    await updateRule(message.url, message.newUrl, message.profileName)
  }
  if (message.method.endsWith('.getConstants')) {
    return {
      DISABLED_PROFILE_NAME,
      DEFAULT_PROFILE_NAME,
      CURRENT_PROFILE_NAME,
    }
  }
  if (message.method.endsWith('.getRules')) {
    return getRules()
  }
  if (message.method.endsWith('.getProfiles')) {
    return getProfiles()
  }
  if (message.method.endsWith('.exportConfig')) {
    return exportConfig()
  }
  if (message.method.endsWith('.enableSync')) {
    await browser.storage.local.set({ sync: true })
    const syncConfig = await browser.storage.sync.get()
    if (!syncConfig || !syncConfig.profiles) {
      const localConfig = await browser.storage.local.get()
      await browser.storage.sync.set({
        profiles: localConfig.profiles,
        rules: localConfig.rules,
        maxParallelWorkers: localConfig.maxParallelWorkers,
      })
    }
    configStorage = browser.storage.sync
    return {}
  }
  if (message.method.endsWith('.disableSync')) {
    await browser.storage.local.set({ sync: false })
    const syncConfig = await browser.storage.sync.get()
    if (syncConfig && syncConfig.profiles) {
      await browser.storage.local.set({
        profiles: syncConfig.profiles,
        rules: syncConfig.rules,
        maxParallelWorkers: syncConfig.maxParallelWorkers,
      })
    }
    configStorage = browser.storage.local
  }
  if (message.method.endsWith('.isSync')) {
    return { sync: (await browser.storage.local.get()).sync }
  }
  return {}
}

async function createProfile(profileName, fromProfileName) {
  const config = await getConfig()
  if (Object.keys(config.profiles).includes(profileName)) {
    throw new Error('Duplicate profile name')
  }
  config.profiles[profileName] = JSON.parse(JSON.stringify(config.profiles[fromProfileName]))
  await configStorage.set({ profiles: config.profiles })
}

async function getProfiles() {
  const config = await getConfig()
  return config.profiles
}

async function getOptions(url) {
  const [config, rule, allTabsData] = await Promise.all([getConfig(), getRule(url), tabsData.get()])
  const tabProfileName = allTabsData.profileName || DEFAULT_PROFILE_NAME
  let selectedProfileName
  if (rule) {
    const profileName = rule.profile
    selectedProfileName = profileName == CURRENT_PROFILE_NAME ? tabProfileName : profileName
  } else {
    selectedProfileName = tabProfileName
  }
  return { profileName: selectedProfileName, ...config.profiles[selectedProfileName] }
}

async function updateProfile(profileName, profile) {
  const config = await getConfig()
  if (!Object.keys(config.profiles).includes(profileName)) {
    throw new Error('Profile not found')
  }
  Object.keys(profile).forEach((key) => (config.profiles[profileName][key] = profile[key]))
  await configStorage.set({ profiles: config.profiles })
}

async function renameProfile(oldProfileName, profileName) {
  const [config, allTabsData] = await Promise.all([getConfig(), tabsData.get()])
  if (!Object.keys(config.profiles).includes(oldProfileName)) {
    throw new Error('Profile not found')
  }
  if (Object.keys(config.profiles).includes(profileName)) {
    throw new Error('Duplicate profile name')
  }
  if (oldProfileName == DEFAULT_PROFILE_NAME) {
    throw new Error('Default settings cannot be renamed')
  }
  if (allTabsData.profileName == oldProfileName) {
    allTabsData.profileName = profileName
    await tabsData.set(allTabsData)
  }
  config.profiles[profileName] = config.profiles[oldProfileName]
  config.rules.forEach((rule) => {
    if (rule.profile == oldProfileName) {
      rule.profile = profileName
    }
  })
  delete config.profiles[oldProfileName]
  await configStorage.set({ profiles: config.profiles, rules: config.rules })
}

async function deleteProfile(profileName) {
  const [config, allTabsData] = await Promise.all([getConfig(), tabsData.get()])
  if (!Object.keys(config.profiles).includes(profileName)) {
    throw new Error('Profile not found')
  }
  if (profileName == DEFAULT_PROFILE_NAME) {
    throw new Error('Default settings cannot be deleted')
  }
  if (allTabsData.profileName == profileName) {
    delete allTabsData.profileName
    await tabsData.set(allTabsData)
  }
  config.rules.forEach((rule) => {
    if (rule.profile == profileName) {
      rule.profile = DEFAULT_PROFILE_NAME
    }
  })
  delete config.profiles[profileName]
  await configStorage.set({ profiles: config.profiles, rules: config.rules })
}

async function getRules() {
  const config = await getConfig()
  return config.rules
}

async function addRule(url, profile) {
  if (!url) {
    throw new Error('URL is empty')
  }
  const config = await getConfig()
  if (config.rules.find((rule) => rule.url == url)) {
    throw new Error('URL already exists')
  }
  config.rules.push({
    url,
    profile,
  })
  await configStorage.set({ rules: config.rules })
}

async function deleteRule(url) {
  if (!url) {
    throw new Error('URL is empty')
  }
  const config = await getConfig()
  config.rules = config.rules.filter((rule) => rule.url != url)
  await configStorage.set({ rules: config.rules })
}

async function deleteRules(profileName) {
  const config = await getConfig()
  config.rules = config.rules = profileName
    ? config.rules.filter((rule) => rule.profile != profileName)
    : []
  await configStorage.set({ rules: config.rules })
}

async function updateRule(url, newURL, profile) {
  if (!url || !newURL) {
    throw new Error('URL is empty')
  }
  const config = await getConfig()
  const urlConfig = config.rules.find((rule) => rule.url == url)
  if (!urlConfig) {
    throw new Error('URL not found')
  }
  if (config.rules.find((rule) => rule.url == newURL && rule.url != url)) {
    throw new Error('New URL already exists')
  }
  urlConfig.url = newURL
  urlConfig.profile = profile
  await configStorage.set({ rules: config.rules })
}

async function getAuthInfo() {
  return (await configStorage.get()).authInfo
}

async function setAuthInfo(authInfo) {
  await configStorage.set({ authInfo })
}

async function removeAuthInfo() {
  const authInfo = getAuthInfo()
  if (authInfo.revokableAccessToken) {
    setAuthInfo({ revokableAccessToken: authInfo.revokableAccessToken })
  } else {
    await configStorage.remove(['authInfo'])
  }
}

async function resetProfiles() {
  await pendingUpgradePromise
  const allTabsData = await tabsData.get()
  delete allTabsData.profileName
  await tabsData.set(allTabsData)
  await configStorage.remove(['profiles', 'rules', 'maxParallelWorkers'])
  await browser.storage.local.set({ sync: false })
  configStorage = browser.storage.local
  await upgrade()
}

async function resetProfile(profileName) {
  const config = await getConfig()
  if (!Object.keys(config.profiles).includes(profileName)) {
    throw new Error('Profile not found')
  }
  config.profiles[profileName] = DEFAULT_CONFIG
  await configStorage.set({ profiles: config.profiles })
}

async function exportConfig() {
  const config = await getConfig()
  const url = URL.createObjectURL(
    new Blob(
      [
        JSON.stringify(
          {
            profiles: config.profiles,
            rules: config.rules,
            maxParallelWorkers: config.maxParallelWorkers,
          },
          null,
          2
        ),
      ],
      { type: 'text/json' }
    )
  )
  const downloadInfo = {
    url,
    filename: `singlefile-settings-${new Date().toISOString().replace(/:/g, '_')}.json`,
    saveAs: true,
  }
  try {
    await download(downloadInfo, '_')
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function importConfig(config) {
  await configStorage.remove(['profiles', 'rules', 'maxParallelWorkers'])
  await configStorage.set({
    profiles: config.profiles,
    rules: config.rules,
    maxParallelWorkers: config.maxParallelWorkers,
  })
  await upgrade()
}
