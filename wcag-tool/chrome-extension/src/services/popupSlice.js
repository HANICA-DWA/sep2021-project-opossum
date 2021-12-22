import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  createSnapshotNotAllowed: false,
  openSnapshotNotAllowed: false,
  createSnapshotMessage: 'Create snapshot',
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setCreateSnapshotNotAllowed: (state, { payload }) => {
      state.createSnapshotNotAllowed = payload.status
      state.createSnapshotMessage = payload.message
    },
    setOpenSnapshotNotAllowed: (state, { payload }) => {
      state.openSnapshotNotAllowed = payload
    },
  },
})

export const { setCreateSnapshotNotAllowed, setOpenSnapshotNotAllowed } = popupSlice.actions
