/* global browser */
import React, {  useState } from 'react'
import ReactDOM from 'react-dom'
import '../index.css'
import '../extension/lib/single-file/browser-polyfill/chrome-browser-polyfill'

const Popup = () => {
  const buttonClasses = 'whitespace-nowrap inline-flex rounded-md bg-gray-100 py-2 px-3 text-xs font-semibold uppercase text-blue-500 hover:bg-opacity-90 border-gray-500 border-b-2 my-2'
  const [loading, setLoading] = useState(false)


  return (
    <div className={'p-4'}>
      <button onClick={async () => {
        setLoading(true)
        const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
        browser.runtime.sendMessage({ method: 'tabs.snapshot', tab })
          .then(response => {
            if (response.method === 'popup.noAccess') {
              alert('Creating snapshot failed. You might be on a protected page.')
              setLoading(false)
            }
          })
      }} className={!loading ? buttonClasses : buttonClasses + ' cursor-default text-gray-700'}
              disabled={loading}>
        {loading ? 'Creating Snapshot...' : 'Create Snapshot'}
      </button>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
)
