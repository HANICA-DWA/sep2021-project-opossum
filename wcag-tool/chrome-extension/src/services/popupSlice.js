import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createSnapshotHeaderButtonIsLoading: false,
  createSnapshotBodyButtonIsLoading: false,
  snapshotCreationNotAllowed: false,
  snapshotIsOpening: false,
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
    setSnapshotIsOpening: (state, { payload }) => {
      state.snapshotIsOpening = payload
    },
  },
})

export const {
  setSnapshotCreationNotAllowed,
  setCreateSnapshotHeaderIsLoading,
  setCreateSnapshotBodyIsLoading,
  setSnapshotIsOpening,
} = popupSlice.actions
