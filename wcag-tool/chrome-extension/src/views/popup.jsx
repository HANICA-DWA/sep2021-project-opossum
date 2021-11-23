import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../css/styles.css'

import { setupStore } from '../services/store'
import SearchBar from './components/popup/searchBar'
import Header from './components/popup/header'
import SnapshotBody from './components/popup/snapshotBody'
import NavigationButtons from './components/popup/navigationButtons'

// eslint-disable-next-line func-names
const Popup = function () {
  return (
    <div className="customSize flex flex-col justify-between text-sm text-gray-500 font-poppins">
      <div>
        <SearchBar />
        <Header />
        <SnapshotBody />
      </div>
      <div>
        <NavigationButtons />
      </div>
    </div>
  )
}

;(async () => {
  const store = await setupStore()

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Popup />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})()
