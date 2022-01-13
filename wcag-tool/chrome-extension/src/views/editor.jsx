import React, { Suspense, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../css/styles.css'
import './editor.css'
import App from '../components/editor/App'
import store from '../services/store'
import { useRegisterEditorEffects } from '../hooks/editor.hooks'
import '../utils/i18n'
import { useTranslation } from 'react-i18next'
import { useOptions } from '../hooks/options.hooks'

const Editor = () => {
  const options = useOptions()
  const { i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(options.language)
  }, [options.language])

  useRegisterEditorEffects()
  return <App />
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <Editor />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
