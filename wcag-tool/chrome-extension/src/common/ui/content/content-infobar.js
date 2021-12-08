

/* global globalThis, singlefile, fetch */

const SCRIPT_PATH = '/single-file/web/infobar-web.js'

const { browser } = globalThis

export { includeScript }

async function includeScript(pageData) {
  let infobarContent
  if (browser && browser.runtime && browser.runtime.getURL) {
    infobarContent = await (await fetch(browser.runtime.getURL(SCRIPT_PATH))).text()
  } else if (singlefile.getFileContent) {
    infobarContent = singlefile.getFileContent(SCRIPT_PATH)
  }
  let lastInfobarContent
  while (lastInfobarContent != infobarContent) {
    lastInfobarContent = infobarContent
    infobarContent = infobarContent.replace(/\/\*(.|\n)*?\*\//, '')
  }
  infobarContent = infobarContent
    .replace(/\t+/g, ' ')
    .replace(/\nthis\.[^(]*/gi, '\n')
    .replace(/\n+/g, '')
  pageData.content += `<script>document.currentScript.remove();${infobarContent}</script>`
}
