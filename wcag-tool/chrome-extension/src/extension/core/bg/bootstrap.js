

import { getMessages } from './i18n.js'
import * as config from './config.js'

export { onMessage }

async function onMessage(message, sender) {
  if (message.method.endsWith('.init')) {
    const [options, messages] = await Promise.all([
      config.getOptions(sender.tab.url, true),
      getMessages(),
    ])
    return { options, tabId: sender.tab.id, tabIndex: sender.tab.index, messages }
  }
}
