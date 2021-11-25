import React, { useEffect } from 'react'
import { setupStore } from '../services/store'
import ReactDOM from 'react-dom'
import { Provider, useSelector } from 'react-redux'
import '../index.css'
import "../extension/lib/single-file/browser-polyfill/chrome-browser-polyfill"

/* global browser */

browser.runtime.onMessage.addListener(msg => {
  console.log(msg)
  return {}
})

const Snapshot = () => {

  return (
    <iframe className='editor'
  srcDoc='&lt;!DOCTYPE html&gt;&lt;body&gt;&lt;/script&gt;&lt;script src=/extension/lib/readability/Readability.js&gt;&lt;/script&gt;&lt;/script&gt;&lt;script src=/extension/lib/readability/Readability-readerable.js&gt;&lt;/script&gt;&lt;/body&gt;'
  sandbox='allow-scripts allow-modals'/>
  )
}

(async () => {
  const store = await setupStore()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Snapshot />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})()
