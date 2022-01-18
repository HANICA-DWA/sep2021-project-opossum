/* global browser */

const STATE_DOWNLOAD_COMPLETE = 'complete'
const STATE_DOWNLOAD_INTERRUPTED = 'interrupted'
const STATE_ERROR_CANCELED_CHROMIUM = 'USER_CANCELED'
const ERROR_DOWNLOAD_CANCELED_GECKO = 'canceled'
const ERROR_CONFLICT_ACTION_GECKO = 'conflictaction prompt not yet implemented'
const ERROR_INCOGNITO_GECKO = "'incognito'"
const ERROR_INCOGNITO_GECKO_ALT = '"incognito"'
const ERROR_INVALID_FILENAME_GECKO = 'illegal characters'
const ERROR_INVALID_FILENAME_CHROMIUM = 'invalid filename'

export { download }

async function download(downloadInfo, replacementCharacter) {
  let downloadId
  try {
    downloadId = await browser.downloads.download(downloadInfo)
  } catch (error) {
    if (error.message) {
      const errorMessage = error.message.toLowerCase()
      const invalidFilename =
        errorMessage.includes(ERROR_INVALID_FILENAME_GECKO) ||
        errorMessage.includes(ERROR_INVALID_FILENAME_CHROMIUM)
      if (invalidFilename && downloadInfo.filename.startsWith('.')) {
        downloadInfo.filename = replacementCharacter + downloadInfo.filename
        return download(downloadInfo, replacementCharacter)
      }
      if (invalidFilename && downloadInfo.filename.includes(',')) {
        downloadInfo.filename = downloadInfo.filename.replace(/,/g, replacementCharacter)
        return download(downloadInfo, replacementCharacter)
      }
      if (invalidFilename && !downloadInfo.filename.match(/^[\x00-\x7F]+$/)) {
        // eslint-disable-line  no-control-regex
        downloadInfo.filename = downloadInfo.filename.replace(
          /[^\x00-\x7F]+/g,
          replacementCharacter
        ) // eslint-disable-line  no-control-regex
        return download(downloadInfo, replacementCharacter)
      }
      if (
        (errorMessage.includes(ERROR_INCOGNITO_GECKO) ||
          errorMessage.includes(ERROR_INCOGNITO_GECKO_ALT)) &&
        downloadInfo.incognito
      ) {
        delete downloadInfo.incognito
        return download(downloadInfo, replacementCharacter)
      }
      if (errorMessage == ERROR_CONFLICT_ACTION_GECKO && downloadInfo.conflictAction) {
        delete downloadInfo.conflictAction
        return download(downloadInfo, replacementCharacter)
      }
      if (errorMessage.includes(ERROR_DOWNLOAD_CANCELED_GECKO)) {
        return {}
      }
      throw error
    } else {
      throw error
    }
  }
  return new Promise((resolve, reject) => {
    browser.downloads.onChanged.addListener(onChanged)

    function onChanged(event) {
      if (event.id == downloadId && event.state) {
        if (event.state.current == STATE_DOWNLOAD_COMPLETE) {
          browser.downloads
            .search({ id: downloadId })
            .then((downloadItems) =>
              resolve({ filename: downloadItems[0] && downloadItems[0].filename })
            )
            .catch(() => resolve({}))
          browser.downloads.onChanged.removeListener(onChanged)
        }
        if (event.state.current == STATE_DOWNLOAD_INTERRUPTED) {
          if (event.error && event.error.current == STATE_ERROR_CANCELED_CHROMIUM) {
            resolve({})
          } else {
            reject(new Error(event.state.current))
          }
          browser.downloads.onChanged.removeListener(onChanged)
        }
      }
    }
  })
}
