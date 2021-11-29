import { combineReducers, createStore } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
import { composeWithDevTools } from 'remote-redux-devtools'
import { snapshotReducer } from './snapshot/snapshotSlice'
import { annotationReducer } from './annotationSlice'

const reducers = combineReducers({
  snapshot: snapshotReducer,
  annotation: annotationReducer,
})

let store

export default () => {
  if (store) return store

  store = storeCreatorFactory({ createStore })(
    reducers,
    composeWithDevTools({ realtime: true, port: 8000 })()
  )
  return store
}
