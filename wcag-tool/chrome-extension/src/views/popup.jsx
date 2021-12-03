import React from 'react'
import ReactDOM from 'react-dom'
import '../css/styles.css'

import Header from '../components/popup/header'
import SnapshotBody from '../components/popup/snapshotBody'
import NavigationButtons from '../components/popup/navigationButtons'

const Popup = function () {
  return (
    <div className="customSize flex flex-col justify-between text-sm text-gray-500 font-poppins">
      <div>
        <Header />
        <SnapshotBody />
      </div>
      <div>
        <NavigationButtons />
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
)
