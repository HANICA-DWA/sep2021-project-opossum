import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../services/store'
import '../css/styles.css'
import OptionsForm from '../components/options/OptionsForm'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <OptionsForm />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
