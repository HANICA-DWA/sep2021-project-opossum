/* eslint-disable import/named */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../css/styles.css'

import { setupStore } from '../services/store'
import { SearchBar } from './components/popup/searchBar'
import { Header } from './components/popup/header'
import { SnapshotBody } from './components/popup/snapshotBody'
import { NavigationButtons } from './components/popup/navigationButtons'

// eslint-disable-next-line func-names
const Popup = function () {
  // const dispatch = useDispatch()

  // const nextAction = () => { dispatch(next()) }
  // const previousAction = () => { dispatch(previous()) }

  return (
    <div className="w-96 h-96 text-sm text-gray-500 font-poppins">
      <SearchBar />
      <Header />
      <SnapshotBody />
      <hr />
      <NavigationButtons />
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
