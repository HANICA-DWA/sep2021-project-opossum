import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listSliderIsOpen: false,
  selectElement: false,
  createSliderIsOpen: false,
  newAnnotation: {},
  annotations: [],
  highlightElement: '',
  detailSliderIsOpen: false,
  selectedAnnotation: {},
  editSliderIsOpen: false,
}

export const annotationSlice = createSlice({
  name: 'annotation',
  initialState,
  reducers: {
    setListSliderIsOpen: (state, action) => {
      state.listSliderIsOpen = action.payload
    },
    setSelectElement: (state, action) => {
      state.selectElement = action.payload
    },
    setCreateSliderIsOpen: (state, action) => {
      state.createSliderIsOpen = action.payload
    },
    addAnnotation: (state, action) => {
      state.annotations = [action.payload, ...state.annotations]
    },
    addNewAnnotation: (state, action) => {
      state.newAnnotation = { ...state.newAnnotation, ...action.payload }
    },
    resetNewAnnotation: (state) => {
      state.newAnnotation = {}
    },
    setHighlightElement: (state, action) => {
      state.highlightElement = action.payload
    },
    setDetailSliderIsOpen: (state, action) => {
      state.detailSliderIsOpen = action.payload
    },
    setSelectedAnnotation: (state, action) => {
      state.selectedAnnotation = action.payload
    },
    deleteAnnotation: (state, action) => {
      state.annotations = state.annotations.filter(
        (annotation) => annotation.title !== action.payload
      )
    },
    setEditSliderIsOpen: (state, action) => {
      state.editSliderIsOpen = action.payload
    },
    updateAnnotation: (state, action) => {
      state.annotations = state.annotations.map((annotation) =>
        annotation.title === action.payload.oldTitle
          ? {
              ...annotation,
              ...action.payload,
            }
          : annotation
      )
    },
  },
})

const {
  reducer: annotationReducer,
  actions: {
    setListSliderIsOpen,
    setSelectElement,
    setCreateSliderIsOpen,
    addAnnotation,
    addNewAnnotation,
    resetNewAnnotation,
    setHighlightElement,
    setDetailSliderIsOpen,
    setSelectedAnnotation,
    deleteAnnotation,
    setEditSliderIsOpen,
    setEditAnnotation,
    updateAnnotation,
  },
} = annotationSlice

export const selectListSliderIsOpen = (state) => state.annotation.listSliderIsOpen
export const selectCreateSliderIsOpen = (state) => state.annotation.createSliderIsOpen
export const selectSelectElement = (state) => state.annotation.selectElement
export const selectAnnotations = (state) => state.annotation.annotations
export const selectNewAnnotation = (state) => state.annotation.newAnnotation
export const selectHighlightElement = (state) => state.annotation.highlightElement
export const selectDetailSliderIsOpen = (state) => state.annotation.detailSliderIsOpen
export const selectDetailAnnotation = (state) => state.annotation.detailAnnotation
export const selectEditSliderIsOpen = (state) => state.annotation.editSliderIsOpen
export const selectSelectedAnnotation = (state) => state.annotation.selectedAnnotation

export {
  annotationReducer,
  setListSliderIsOpen,
  setSelectElement,
  setCreateSliderIsOpen,
  addAnnotation,
  addNewAnnotation,
  resetNewAnnotation,
  setHighlightElement,
  setDetailSliderIsOpen,
  setSelectedAnnotation,
  deleteAnnotation,
  setEditSliderIsOpen,
  setEditAnnotation,
  updateAnnotation,
}
