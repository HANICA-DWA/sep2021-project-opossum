import { createStore, combineReducers } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
import { configureStore } from '@reduxjs/toolkit'
import { settingsReducer } from './services'

const reducer = combineReducers({
  settings: settingsReducer,
})

// Persistent store
const setupStore = async () => await storeCreatorFactory({ createStore })(reducer)

// Non persistent store
// TODO: Overbodig, puur ter demonstratie
const store = configureStore({
  reducer: {
    settings: settingsReducer,
  },
})

export { store, setupStore }
