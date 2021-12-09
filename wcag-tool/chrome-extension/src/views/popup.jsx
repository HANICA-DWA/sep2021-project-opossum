import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from '../services/store'
import Header from '../components/popup/header'
import SnapshotBody from '../components/popup/snapshotBody'
import NavigationButtons from '../components/popup/navigationButtons'
import '../extension/lib/single-file/browser-polyfill/chrome-browser-polyfill'
import 'react-toastify/dist/ReactToastify.css'

const Popup = () => {
  return (
    <>
      <div className="customSize flex flex-col justify-between text-sm text-gray-500 font-poppins">
        <div>
          <Header />
          <SnapshotBody />
        </div>
        <div>
          <NavigationButtons />
        </div>
      </div>
      <ToastContainer />
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
