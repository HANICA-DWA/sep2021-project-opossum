import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snapshotProvider: null,
  annotationDetailProvider: null,
  annotationEditProvider: null,
}

export const collaborationSlice = createSlice({
  name: 'collaboration',
  initialState,
  reducers: {
    setSnapshotProvider: (state, { payload }) => {
      state.snapshotProvider = payload
    },
    setAnnotationDetailProvider: (state, { payload }) => {
      state.annotationDetailProvider = payload
    },
    setAnnotationEditProvider: (state, { payload }) => {
      state.annotationEditProvider = payload
    },
  },
})

export const { setSnapshotProvider, setAnnotationDetailProvider, setAnnotationEditProvider } =
  collaborationSlice.actions
