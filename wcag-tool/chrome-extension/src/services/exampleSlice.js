import { createSlice } from '@reduxjs/toolkit'

const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    loading: false,
    error: '',
    data: '',
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
  },
})

const {
  reducer: exampleReducer,
  actions: { setData },
} = exampleSlice

export { exampleReducer, setData }
