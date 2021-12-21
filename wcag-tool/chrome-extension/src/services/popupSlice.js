import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snapshotNotAllowed: false,
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setSnapshotNotAllowed: (state, { payload }) => {
      state.snapshotNotAllowed = payload
    },
  },
})

export const { setSnapshotNotAllowed } = popupSlice.actions
