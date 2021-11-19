/*global chrome*/
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { setupStore } from '../services/store'
import '../index.css'
import { setData } from '../services/mainSlice'
import { getPageData } from '../lib/single-file'

const Popup = () => {
  const data = useSelector(state => state.main.data)
  const dispatch = useDispatch()
  const buttonClasses = 'whitespace-nowrap inline-flex rounded-md bg-gray-100 py-2 px-3 text-xs font-semibold uppercase text-blue-500 hover:bg-opacity-90 border-gray-500 border-b-2 my-2'

  return (
    <div className={'p-4'}>
      <button onClick={async () => {
        const [{ id: index }] = await chrome.tabs.query({ active: true })
        const page = await getPageData(,,document, window)

      }} className={buttonClasses}>
        Save as mhtml
      </button>
      <button className={buttonClasses} onClick={() => chrome.tabs.create({ url: '/snapshot.html' })}>Open Snapshot
      </button>
      {data ? '' : <p className={'text-red-700'}>No snapshot saved</p>}
      <button className={buttonClasses} onClick={() => dispatch(setData(undefined))}>Remove snapshot</button>
      <button className={buttonClasses} onClick={async () => chrome.fileSystemProvider.getAll(console.log)}>FileSystems</button>
    </div>
  )
}

(async () => {
  const store = await setupStore()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Popup />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})()
