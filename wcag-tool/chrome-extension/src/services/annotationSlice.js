import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  highlightedElementSelector: '',
  newAnnotationSelector: '',
  selectedAnnotationId: '',
  annotationIndex: -1,
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
      state.selectedAnnotationId = payload.id
      if (payload.index !== undefined) {
        state.annotationIndex = payload.index
      }
    },
  },
})

export const { setNewAnnotationSelector, setHighlightedElementSelector, setSelectedAnnotationId } =
  annotationSlice.actions
