import { createSlice } from '@reduxjs/toolkit'

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    setData: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.data = action.payload
    },
  },
})

const {
  reducer: exampleReducer,
  actions: { setData },
} = exampleSlice

export { exampleReducer, setData }
