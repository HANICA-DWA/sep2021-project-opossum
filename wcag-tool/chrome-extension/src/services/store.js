import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import devToolsEnhancer from 'remote-redux-devtools'
import { api } from './apiService'
import { annotationSlice } from './annotationSlice'
import { sliderSlice } from './slidersSlice'
import { loadingSlice } from './loadingSlice'
import { snapshotSlice } from './snapshotSlice'

const store = configureStore({
  reducer: {
    annotation: annotationSlice.reducer,
    sliders: sliderSlice.reducer,
    loading: loadingSlice.reducer,
    snapshot: snapshotSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  devTools: false,
  enhancers: [devToolsEnhancer({ realtime: true, port: 8000 })],
})

setupListeners(store.dispatch)

export default store
