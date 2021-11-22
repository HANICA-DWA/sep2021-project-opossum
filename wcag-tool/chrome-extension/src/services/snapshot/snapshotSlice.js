import { createSlice } from '@reduxjs/toolkit'

const snapshotSlice = createSlice({
  name: 'snapshot',

  initialState: {
    isLoading: false,
    snapshots: undefined,
    error: undefined,
  },

  reducers: {
    previous: () => {
      console.log('Previous button clicked')
    },
    next: () => {
      console.log('Next button clicked')
    },
    createSnapshot: () => {
      console.log('Create snapshot button clicked')
    },
  },
})

const {
  reducer: snapshotReducer,
  actions: { previous, next, createSnapshot },
} = snapshotSlice

export { snapshotReducer, previous, next, createSnapshot }
