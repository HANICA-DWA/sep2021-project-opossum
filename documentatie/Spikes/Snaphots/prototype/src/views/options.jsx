import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setupStore, store } from '../services/store'

const Options = function () {
  return <h1>Options</h1>
}

(async () => {
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
