import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createSnapshotNotAllowed: false,
  openSnapshotNotAllowed: false,
  createSnapshotErrorMessage: '',
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setSnapshotNotAllowed: (state, { payload }) => {
      state.createSnapshotNotAllowed = payload
      state.openSnapshotNotAllowed = payload
    },
    setCreateSnapshotNotAllowed: (state, { payload }) => {
      state.createSnapshotNotAllowed = payload.status
      state.createSnapshotErrorMessage = payload.message
    },
    setOpenSnapshotNotAllowed: (state, { payload }) => {
      state.openSnapshotNotAllowed = payload
    },
  },
})

export const { setSnapshotNotAllowed, setCreateSnapshotNotAllowed, setOpenSnapshotNotAllowed } =
  popupSlice.actions
