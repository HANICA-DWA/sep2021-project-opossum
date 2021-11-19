import React from 'react'
import { setupStore } from '../services/store'
import ReactDOM from 'react-dom'
import { Provider, useSelector } from 'react-redux'
import '../index.css'

const Snapshot = () => {
  const snapshot = useSelector(state => state.main.data)

  return (
    <iframe src={'data:text/mhtml;charset=utf-8,'+snapshot} className={'h-screen w-full'} />
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
