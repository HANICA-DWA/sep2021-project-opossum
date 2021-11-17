import { combineReducers, createStore } from 'redux'
import storeCreatorFactory from 'reduxed-chrome-storage'
// eslint-disable-next-line import/named
import { exampleReducer } from './exampleSlice'
// eslint-disable-next-line import/named
import { snapshotReducer } from './snapshotSlice'

const reducer = combineReducers({
  example: exampleReducer,
  snapshot: snapshotReducer,
})

const setupStore = () => storeCreatorFactory({ createStore })(reducer)

export default { setupStore }
