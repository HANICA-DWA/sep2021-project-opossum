import { combineReducers, createStore } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
import mainReducer from './mainSlice'
import { composeWithDevTools } from 'remote-redux-devtools'

const reducers = combineReducers({
  main: mainReducer,
})

export const store = ()=> storeCreatorFactory({createStore})(reducers, composeWithDevTools({realtime: true, port: 8000})())