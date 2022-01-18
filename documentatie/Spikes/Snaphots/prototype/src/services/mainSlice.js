import { createSlice } from '@reduxjs/toolkit'

const main = createSlice({
  name: 'main',
  initialState: {},
  reducers: {
    setData: (state, { payload } ) => {
      state.data = payload
    },
  },
})

export const { setData } = main.actions;

export default main.reducer