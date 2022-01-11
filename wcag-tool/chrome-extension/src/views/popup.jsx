import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import { Provider } from 'react-redux'
import store from '../services/store'
import Header from '../components/popup/header'
import SnapshotBody from '../components/popup/snapshotBody'
import '../extension/lib/single-file/browser-polyfill/chrome-browser-polyfill'
import { useRegisterPopupEffects } from '../hooks/popup.hooks'
import '../components/popup/animate.css'
import '../utils/i18n'

const Popup = () => {
  useRegisterPopupEffects()
  return (
    <div className="mt-0.5 mx-0.5 customSize flex flex-col text-sm text-gray-500 font-poppins overflow-hidden">
      <Header />
      <SnapshotBody />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <Popup />
      </Suspense>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
