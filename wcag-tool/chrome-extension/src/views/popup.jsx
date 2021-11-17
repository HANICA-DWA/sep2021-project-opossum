import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setupStore } from '../services/store'
import '../styles.css'

const Popup = function () {
  return <h1 className={'text-xl font-bold'}>Popup</h1>
}

;(async () => {
  const store = await setupStore()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Popup />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})()
