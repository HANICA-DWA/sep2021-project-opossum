import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newAnnotation: {},
  annotations: [],
  highlightElement: ''
}

export const annotationSlice = createSlice({
  name: 'annotation',
  initialState,
  reducers: {
    setSelectElement: (state, action) => {
      state.selectElement = action.payload
    },
    addAnnotation: (state, action) => {
      state.annotations = [action.payload, ...state.annotations]
    },
    setNewAnnotationSelector: (state, { payload }) => {
      state.newAnnotationSelector = payload
    },
    unsetNewAnnotationSelector: (state) => {
      state.newAnnotationSelector = undefined
    },
    setHighlightElement: (state, action) => {
      state.highlightElement = action.payload
    },
    setSelectedAnnotation: (state, action) => {
      state.selectedAnnotation = action.payload
    },
    unsetSelectedAnnotation: (state) => {
      state.selectedAnnotation = undefined
    },
    deleteAnnotation: (state, action) => {
      state.annotations = state.annotations.filter(
        (annotation) => annotation.title !== action.payload
      )
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

export const selectorSelectElement = (state) => state.annotation.selectElement
export const selectorAnnotations = (state) => state.annotation.annotations
export const selectorNewAnnotation = (state) => state.annotation.newAnnotation
export const selectorHighlightElement = (state) => state.annotation.highlightElement
export const selectorSelectedAnnotation = (state) => state.annotation.selectedAnnotation

export const {
  setSelectElement,
  addAnnotation,
  setNewAnnotationSelector,
  unsetNewAnnotationSelector,
  setHighlightElement,
  setSelectedAnnotation,
  deleteAnnotation,
  updateAnnotation,
  unsetSelectedAnnotation,
} = annotationSlice.actions
