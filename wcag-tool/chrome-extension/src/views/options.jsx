import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../services/store'
import '../css/styles.css'

const Options = function () {
  const [username, setUsername] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    chrome.storage.sync.get(['username'], (result) => {
      setUsername(result.username)
    })
  }, [])

  const saveOptions = () => {
    chrome.storage.sync.set(
      {
        username,
      },
      () => {
        setSaved(true)
      }
    )
  }
  return (
    <div className={'m-6'}>
      <h1 className="text-xl font-poppins mb-3">Options</h1>
      <label className="block font-poppins text-gray-700 text-sm font-bold mb-1" htmlFor="username">
        Username
      </label>
      <div className={'grid grid-cols-2 -ml-2'}>
        <input
          className="shadow font-poppins appearance-none border border-gray-300 rounded-l-lg py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
          id="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            if (saved) {
              setSaved(false)
            }
          }}
          placeholder="Username"
        />
        <div>
          <button
            disabled={!username || saved}
            onClick={saveOptions}
            type="button"
            className={`py-1 px-4 inline-grid grid-flow-col grid-cols-2  ${
              saved
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200'
            } text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-r-lg`}
          >
            {!saved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 inline"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Options />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
