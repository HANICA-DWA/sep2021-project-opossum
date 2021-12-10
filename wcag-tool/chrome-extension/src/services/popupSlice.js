import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createSnapshotHeaderIsLoading: false,
  createSnapshotBodyIsLoading: false,
  snapshotCreationNotAllowed: false,
  lastError: [],
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setCreateSnapshotHeaderIsLoading: (state, { payload }) => {
      state.createSnapshotHeaderIsLoading = payload
    },
    setCreateSnapshotBodyIsLoading: (state, { payload }) => {
      state.createSnapshotBodyIsLoading = payload
    },
    setSnapshotCreationNotAllowed: (state, { payload }) => {
      state.snapshotCreationNotAllowed = payload
    },
    setLastError: (state, { payload }) => {
      state.lastError.push(payload)
    },
  },
})

export const {
  setSnapshotCreationNotAllowed,
  setCreateSnapshotHeaderIsLoading,
  setCreateSnapshotBodyIsLoading,
} = popupSlice.actions
