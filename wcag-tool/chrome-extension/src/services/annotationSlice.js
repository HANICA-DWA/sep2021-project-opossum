import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  highlightedElementSelector: '',
  newAnnotationSelector: '',
  selectedAnnotationId: '',
}

export const annotationSlice = createSlice({
  name: 'annotation',
  initialState,
  reducers: {
    setNewAnnotationSelector: (state, { payload }) => {
      state.newAnnotationSelector = payload
    },
    setHighlightedElementSelector: (state, { payload }) => {
      state.highlightedElementSelector = payload
    },
    setSelectedAnnotationId: (state, { payload }) => {
      state.selectedAnnotationId = payload
    },
  },
})

export const { setNewAnnotationSelector, setHighlightedElementSelector, setSelectedAnnotationId } =
  annotationSlice.actions
