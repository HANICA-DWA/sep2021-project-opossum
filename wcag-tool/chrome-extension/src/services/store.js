import { combineReducers, createStore } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
import { exampleReducer } from './exampleSlice'

const reducer = combineReducers({
  example: exampleReducer,
})

const setupStore = () => storeCreatorFactory({ createStore })(reducer)

export { setupStore }
