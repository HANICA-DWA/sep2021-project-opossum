import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setupStore } from '../services/store'
import '../styles.css'

const Options = function () {
  return <h1>Options</h1>
}

;(async () => {
  const store = await setupStore()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Options />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})()
