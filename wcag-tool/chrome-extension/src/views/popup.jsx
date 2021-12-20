import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import { Provider } from 'react-redux'
import { cssTransition, ToastContainer } from 'react-toastify'
import store from '../services/store'
import Header from '../components/popup/header'
import SnapshotBody from '../components/popup/snapshotBody'
import '../extension/lib/single-file/browser-polyfill/chrome-browser-polyfill'
import 'react-toastify/dist/ReactToastify.css'
import { useRegisterPopupEffects } from '../hooks/popup.hooks'
import '../components/popup/animate.css'

const Popup = () => {
  const customTransition = cssTransition({
    exit: 'animate__animated animate__backOutUp',
  })

  useRegisterPopupEffects()
  return (
    <>
      <div className="mt-0.5 mx-0.5 customSize flex flex-col text-sm text-gray-500 font-poppins overflow-hidden">
        <Header />
        <SnapshotBody />
      </div>
      <ToastContainer
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={false}
        position="top-center"
        draggable={false}
        transition={customTransition}
      />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Popup />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
