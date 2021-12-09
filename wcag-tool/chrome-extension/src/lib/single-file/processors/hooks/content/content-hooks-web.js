

/* global window, globalThis */

;((globalThis) => {
  const FETCH_REQUEST_EVENT = 'single-file-request-fetch'
  const FETCH_RESPONSE_EVENT = 'single-file-response-fetch'

  const { CustomEvent } = globalThis
  const { fetch } = globalThis
  const addEventListener = (type, listener, options) =>
    globalThis.addEventListener(type, listener, options)
  const dispatchEvent = (event) => globalThis.dispatchEvent(event)

  addEventListener(FETCH_REQUEST_EVENT, async (event) => {
    const url = event.detail
    let detail
    try {
      const response = await fetch(url, { cache: 'force-cache' })
      detail = {
        url,
        response: await response.arrayBuffer(),
        headers: [...response.headers],
        status: response.status,
      }
    } catch (error) {
      detail = { url, error: error && error.toString() }
    }
    dispatchEvent(new CustomEvent(FETCH_RESPONSE_EVENT, { detail }))
  })
})(typeof globalThis === 'object' ? globalThis : window)
