import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listSliderIsOpen: false,
  createSliderIsOpen: false,
  detailSliderIsOpen: false,
}

export const sliderSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    setListSliderIsOpen: (state, action) => {
      state.listSliderIsOpen = action.payload
    },
    setCreateSliderIsOpen: (state, { payload }) => {
      state.createSliderIsOpen = payload
    },
    setDetailSliderIsOpen: (state, action) => {
      state.detailSliderIsOpen = action.payload
    },
  },
})

export const selectorCreateSliderIsOpen = (state) => state.sliders.createSliderIsOpen
export const selectorListSliderIsOpen = (state) => state.sliders.listSliderIsOpen
export const selectorDetailSliderIsOpen = (state) => state.sliders.detailSliderIsOpen

export const { setListSliderIsOpen, setDetailSliderIsOpen, setCreateSliderIsOpen } =
  sliderSlice.actions
