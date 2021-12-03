import React from 'react'
import AnnotationListItem from './AnnotationListItem'

const AnnotationList = function ({ annotations }) {
  return annotations.map((annotation) => (
    <Annotation key={annotation._id} annotation={annotation} />
  ))
}

export default AnnotationList
