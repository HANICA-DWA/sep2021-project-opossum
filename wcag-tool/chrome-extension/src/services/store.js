import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import devToolsEnhancer from 'remote-redux-devtools'
import { api } from './apiService'
import { annotationReducer } from './annotationSlice'

const store = configureStore({
  reducer: {
    annotation: annotationReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: false,
  enhancers: [devToolsEnhancer({ realtime: true, port: 8000 })],
})

setupListeners(store.dispatch)

export default store
