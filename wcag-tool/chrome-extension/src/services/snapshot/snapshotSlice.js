import { createSlice } from '@reduxjs/toolkit'

const snapshotSlice = createSlice({
  name: 'snapshot',

  initialState: {
    isLoading: false,
    snapshots: [],
    error: false,
    errorMessage: '',
    filter: '',
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
    filter: () => {
      console.log('Filter added')
    },
  },
})

const {
  reducer: snapshotReducer,
  actions: { previous, next, createSnapshot, filter },
} = snapshotSlice

export { snapshotReducer, previous, next, createSnapshot, filter }
