import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { setupStore } from '../services/store'
import '../index.css'

const Popup = function () {
  return (
    <div className={'text-xl font-bold '}>
      Hello
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
