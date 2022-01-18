import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isIdle: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsIdle: (state, { payload }) => {
      state.isIdle = payload
    },
  },
})

export const { setIsIdle } = userSlice.actions
