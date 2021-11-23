import { combineReducers, createStore } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
import { composeWithDevTools } from 'remote-redux-devtools'
import { exampleReducer } from './exampleSlice'
import { snapshotReducer } from './snapshot/snapshotSlice'

const reducers = combineReducers({
  example: exampleReducer,
  snapshot: snapshotReducer,
})

let store

// eslint-disable-next-line import/prefer-default-export
export const setupStore = () => {
  if (store) return store

  store = storeCreatorFactory({ createStore })(
    reducers,
    composeWithDevTools({ realtime: true, port: 8000 })()
  )
  return store
}
