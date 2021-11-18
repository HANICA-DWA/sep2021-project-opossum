import React from 'react'
import { setupStore } from '../services/store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../index.css'

const Snapshot = () => {
  return (
    <div>
      Test page
    </div>
  )
}

(async () => {
  const store = setupStore()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Snapshot />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})()
