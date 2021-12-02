import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  annotations: [],
}

export const annotationSlice = createSlice({
  name: 'annotation',
  initialState,
  reducers: {
    setSelectElement: (state, action) => {
      state.selectElement = action.payload
    },
    addAnnotation: (state, { payload }) => {
      state.annotations.push(payload)
    },
    setNewAnnotationSelector: (state, { payload }) => {
      state.newAnnotationSelector = payload
    },
    unsetNewAnnotationSelector: (state) => {
      state.newAnnotationSelector = undefined
    },
    setHighlightElement: (state, { payload }) => {
      state.highlightElement = payload
    },
    setSelectedAnnotation: (state, { payload }) => {
      state.selectedAnnotation = payload
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
export const selectorNewAnnotation = (state) => state.annotation.newAnnotationSelector
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
