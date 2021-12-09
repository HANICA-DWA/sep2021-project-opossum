

/* global browser, fetch */

browser.runtime.onMessage.addListener((message, sender) => {
  if (message.method && message.method.startsWith('singlefile.fetch')) {
    return new Promise((resolve) => {
      onRequest(message, sender)
        .then(resolve)
        .catch((error) => resolve({ error: error && error.toString() }))
    })
  }
})

function onRequest(message, sender) {
  if (message.method == 'singlefile.fetch') {
    return fetchResource(message.url)
  }
  if (message.method == 'singlefile.fetchFrame') {
    return browser.tabs.sendMessage(sender.tab.id, message)
  }
}

async function fetchResource(url) {
  const response = await fetch(url)
  const array = Array.from(new Uint8Array(await response.arrayBuffer()))
  const headers = { 'content-type': response.headers.get('content-type') }
  const { status } = response
  return {
    array,
    headers,
    status,
  }
}
