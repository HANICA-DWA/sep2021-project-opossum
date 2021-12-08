

/* global browser, infobar, document, URL, Blob, MouseEvent, setTimeout, open */

const MAX_CONTENT_SIZE = 32 * (1024 * 1024)

export { downloadPage }

async function downloadPage(pageData, options) {
  if (options.includeInfobar) {
    await infobar.includeScript(pageData)
  }
  if (options.includeBOM) {
    pageData.content = `\ufeff${pageData.content}`
  }
  if (options.backgroundSave || options.openEditor) {
    for (
      let blockIndex = 0;
      blockIndex * MAX_CONTENT_SIZE < pageData.content.length;
      blockIndex++
    ) {
      const message = {
        method: 'downloads.download',
        taskId: options.taskId,
        confirmFilename: options.confirmFilename,
        filenameConflictAction: options.filenameConflictAction,
        filename: pageData.filename,
        saveToClipboard: options.saveToClipboard,
        forceWebAuthFlow: options.forceWebAuthFlow,
        extractAuthCode: options.extractAuthCode,
        filenameReplacementCharacter: options.filenameReplacementCharacter,
        openEditor: options.openEditor,
        openSavedPage: options.openSavedPage,
        compressHTML: options.compressHTML,
        backgroundSave: options.backgroundSave,
        bookmarkId: options.bookmarkId,
        replaceBookmarkURL: options.replaceBookmarkURL,
        applySystemTheme: options.applySystemTheme,
        defaultEditorMode: options.defaultEditorMode,
        includeInfobar: options.includeInfobar,
        warnUnsavedPage: options.warnUnsavedPage,
      }
      message.truncated = pageData.content.length > MAX_CONTENT_SIZE
      if (message.truncated) {
        message.finished = (blockIndex + 1) * MAX_CONTENT_SIZE > pageData.content.length
        message.content = pageData.content.substring(
          blockIndex * MAX_CONTENT_SIZE,
          (blockIndex + 1) * MAX_CONTENT_SIZE
        )
      } else {
        message.content = pageData.content
      }
      await browser.runtime.sendMessage(message)
    }
    if (!options.openEditor && options.saveToClipboard) {
      saveToClipboard(pageData)
    }
  } else {
    if (options.saveToClipboard) {
      saveToClipboard(pageData)
    } else {
      await downloadPageForeground(pageData)
    }
    if (options.openSavedPage) {
      open(URL.createObjectURL(new Blob([pageData.content], { type: 'text/html' })))
    }
    browser.runtime.sendMessage({ method: 'ui.processEnd' })
  }
  await browser.runtime.sendMessage({
    method: 'downloads.end',
    taskId: options.taskId,
    hash: pageData.hash,
    woleetKey: options.woleetKey,
  })
}

async function downloadPageForeground(pageData) {
  if (pageData.filename && pageData.filename.length) {
    const link = document.createElement('a')
    link.download = pageData.filename
    link.href = URL.createObjectURL(new Blob([pageData.content], { type: 'text/html' }))
    link.dispatchEvent(new MouseEvent('click'))
    URL.revokeObjectURL(link.href)
  }
  return new Promise((resolve) => setTimeout(resolve, 1))
}

function saveToClipboard(page) {
  const command = 'copy'
  document.addEventListener(command, listener)
  document.execCommand(command)
  document.removeEventListener(command, listener)

  function listener(event) {
    event.clipboardData.setData('text/html', page.content)
    event.clipboardData.setData('text/plain', page.content)
    event.preventDefault()
  }
}
