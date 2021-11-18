import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from '../services/store'

const Options = function () {
  return <h1>Options</h1>
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Options />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
