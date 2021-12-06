import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../css/styles.css'
import './editor.css'
import './editorjs'
import App from '../components/editor/App'
import store from '../services/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
