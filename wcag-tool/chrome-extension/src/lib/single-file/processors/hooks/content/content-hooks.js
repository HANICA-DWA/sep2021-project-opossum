

/* global globalThis */

const { browser } = globalThis
const { document } = globalThis
const { Document } = globalThis

if (document instanceof Document) {
  const scriptElement = document.createElement('script')
  scriptElement.async = false
  if (browser && browser.runtime && browser.runtime.getURL) {
    scriptElement.src = browser.runtime.getURL('/single-file/web/hooks/hooks-web.js')
    scriptElement.async = false
  }
  ;(document.documentElement || document).appendChild(scriptElement)
  scriptElement.remove()
}
