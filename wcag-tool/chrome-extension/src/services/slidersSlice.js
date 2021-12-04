import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listSliderIsOpen: false,
  createAndEditSliderIsOpen: false,
  detailsSliderIsOpen: false,
  elementSelectorIsOpen: false,
}

export const sliderSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    setListSliderIsOpen: (state, action) => {
      state.listSliderIsOpen = action.payload
    },
    setCreateAndEditSliderIsOpen: (state, action) => {
      state.createAndEditSliderIsOpen = action.payload
    },
    setDetailSliderIsOpen: (state, action) => {
      state.detailsSliderIsOpen = action.payload
    },
    setElementSelectorIsOpen: (state, action) => {
      state.elementSelectorIsOpen = action.payload
    },
  },
})

export const {
  setListSliderIsOpen,
  setDetailSliderIsOpen,
  setCreateAndEditSliderIsOpen,
  setElementSelectorIsOpen,
} = sliderSlice.actions
