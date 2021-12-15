import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createSnapshotHeaderButtonIsLoading: false,
  createSnapshotBodyButtonIsLoading: false,
  snapshotCreationNotAllowed: false,
  lastError: [],
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setCreateSnapshotHeaderIsLoading: (state, { payload }) => {
      state.createSnapshotHeaderButtonIsLoading = payload
    },
    setCreateSnapshotBodyIsLoading: (state, { payload }) => {
      state.createSnapshotBodyButtonIsLoading = payload
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
