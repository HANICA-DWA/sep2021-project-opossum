import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../css/styles.css'
import './editor.css'
import './editorjs'
import App from '../components/editor/App'
import store from '../services/store'
import { useSliders } from '../hooks'

const Editor = () => {
  const [{ openCreateAndEditSlider }] = useSliders()

  useEffect(() => {
    const eventListener = (event) => {
      const message = JSON.parse(event.data)
      if (message.method === 'onUpdate') {
        tabData.docSaved = message.saved
      }
      if (message.method === 'onInit') {
        tabData.options.disableFormatPage = !message.formatPageEnabled
        // formatPageButton.hidden = !message.formatPageEnabled;
        document.title = '[WCAG] ' + message.title
        if (message.filename) {
          tabData.filename = message.filename
        }
        if (message.icon) {
          const linkElement = document.createElement('link')
          linkElement.rel = 'icon'
          linkElement.href = message.icon
          document.head.appendChild(linkElement)
        }
        tabData.docSaved = true
      }

      if (message.method === 'onElementSelected') {
        console.log('onElementSelected', message)
        openCreateAndEditSlider(message.content)
      }
    }

    addEventListener('message', eventListener)

    return () => {
      removeEventListener('message', eventListener)
    }
  }, [])

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
