import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  annotations: [],
  selectElement: undefined,
  newAnnotationSelector: undefined,
  highlightElement: undefined,
  selectedAnnotation: {},
}

export const annotationSlice = createSlice({
  name: 'annotation',
  initialState,
  reducers: {
    setSelectElement: (state, action) => {
      state.selectElement = action.payload
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
      console.log('payload:', payload)
      console.log('state:', state.selectedAnnotation)

      state.selectedAnnotation._id = payload._id
      state.selectedAnnotation.successCriterium = payload.successCriterium
      state.selectedAnnotation.title = payload.title
      state.selectedAnnotation.description = payload.description
      state.selectedAnnotation.createdAt = payload.createdAt
      state.selectedAnnotation.updatedAt = payload.updatedAt
    },
    unsetSelectedAnnotation: (state) => {
      state.selectedAnnotation = {}
    },
    deleteAnnotation: (state, action) => {
      state.annotations = state.annotations.filter(
        (annotation) => annotation.title !== action.payload
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
  setNewAnnotationSelector,
  unsetNewAnnotationSelector,
  setHighlightElement,
  setSelectedAnnotation,
  deleteAnnotation,
  unsetSelectedAnnotation,
} = annotationSlice.actions
