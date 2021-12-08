import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../css/styles.css'
import './editor.css'
import App from '../components/editor/App'
import store from '../services/store'
import { useRegisterEditorEffects } from '../hooks/editor.hooks'

const Editor = () => {
  useRegisterEditorEffects()
  return <App />
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Editor />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
