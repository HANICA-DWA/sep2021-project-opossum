/* global browser */

export { onMessage }

async function onMessage(message) {
  if (message.method.endsWith('.resourceCommitted')) {
    if (
      message.tabId &&
      message.url &&
      (message.type == 'stylesheet' || message.type == 'script')
    ) {
      await browser.tabs.sendMessage(message.tabId, message)
    }
  }
}
