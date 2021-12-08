import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  popupHeaderCreateSnapshot: false,
  popupBodyCreateSnapshot: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoaderPopupHeader: (state, { payload }) => {
      state.popupHeaderCreateSnapshot = payload
    },
    setLoaderPopupBody: (state, { payload }) => {
      state.popupBodyCreateSnapshot = payload
    },
  },
})

export const { setLoaderPopupHeader, setLoaderPopupBody } = loadingSlice.actions
