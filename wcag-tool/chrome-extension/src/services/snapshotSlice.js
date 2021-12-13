import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  snapshotId: undefined,
}

export const snapshotSlice = createSlice({
  name: 'snapshot',
  initialState,
  reducers: {
    setSnapshotId: (state, { payload }) => {
      state.snapshotId = payload
    },
  },
})

export const { setSnapshotId } = snapshotSlice.actions
