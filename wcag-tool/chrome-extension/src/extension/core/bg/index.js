/* global browser */

import '../../../../dist/single-file/chrome-browser-polyfill.js'

import * as config from './config.js'
import * as bootstrap from './bootstrap.js'
import * as bookmarks from './bookmarks.js'
import * as devtools from './devtools.js'
import * as downloads from './downloads.js'
import * as editor from './editor.js'
import * as tabsData from './tabs-data.js'
import * as tabs from './tabs.js'
import * as ui from '../../ui/bg/index.js'
import '../../lib/single-file/background.js'

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.method.startsWith('tabs.')) {
    return tabs.onMessage(message, sender)
  }
  if (message.method.startsWith('downloads.')) {
    return downloads.onMessage(message, sender)
  }
  if (message.method.startsWith('bootstrap.')) {
    return bootstrap.onMessage(message, sender)
  }
  if (message.method.startsWith('ui.')) {
    return ui.onMessage(message, sender)
  }
  if (message.method.startsWith('config.')) {
    return config.onMessage(message, sender)
  }
  if (message.method.startsWith('tabsData.')) {
    return tabsData.onMessage(message, sender)
  }
  if (message.method.startsWith('devtools.')) {
    return devtools.onMessage(message, sender)
  }
  if (message.method.startsWith('editor.')) {
    return editor.onMessage(message, sender)
  }
  if (message.method.startsWith('bookmarks.')) {
    return bookmarks.onMessage(message, sender)
  }
})
