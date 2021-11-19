import { combineReducers, createStore } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
import mainReducer from './mainSlice'
import { composeWithDevTools } from 'remote-redux-devtools'

const reducers = combineReducers({
  main: mainReducer,
})

let store

export const setupStore = () => {
  if (store) return store

  store = storeCreatorFactory({ createStore })(reducers, composeWithDevTools({ realtime: true, port: 8000 })())
  return store
}