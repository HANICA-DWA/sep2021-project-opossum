import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../services/store'
import '../css/styles.css'
import OptionsForm from '../components/options/OptionsForm'
import '../utils/i18n'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <OptionsForm />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
