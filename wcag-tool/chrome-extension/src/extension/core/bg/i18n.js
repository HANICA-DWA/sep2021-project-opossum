

/* global browser, fetch */

let messages
getMessages()

export { getMessages }

async function getMessages() {
  if (!messages) {
    let language = ((await browser.i18n.getAcceptLanguages())[0] || 'en').replace(/-/, '_')
    let response
    try {
      response = await fetch(`/_locales/${language}/messages.json`)
    } catch (error) {
      if (language.includes('_')) {
        language = language.split('_')[0]
        try {
          response = await fetch(`/_locales/${language}/messages.json`)
        } catch (error) {
          response = await fetch('/_locales/en/messages.json')
        }
      } else {
        throw error
      }
    }
    messages = await response.json()
  }
  return messages
}
