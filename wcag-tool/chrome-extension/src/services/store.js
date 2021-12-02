import { combineReducers, createStore } from 'redux';
import storeCreatorFactory from 'reduxed-chrome-storage';
import { composeWithDevTools } from 'remote-redux-devtools';
import { annotationSlice } from './annotationSlice';

const reducers = combineReducers({
  annotation: annotationSlice.reducer,
});

let store;

export default () => {
  if (store) return store;

  store = storeCreatorFactory({ createStore })(
    reducers,
    composeWithDevTools({ realtime: true, port: 8000 })()
  );
  return store;
};
