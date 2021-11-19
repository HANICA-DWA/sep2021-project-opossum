import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line import/named
import { setupStore } from '../services/store'
import '../styles.css'

// eslint-disable-next-line func-names
const Options = function () {
  return (
    <div className="header">
      <p>hello world</p>
    </div>
  )

  // return <h1>Options</h1>
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
