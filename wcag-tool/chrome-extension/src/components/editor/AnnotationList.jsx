import React from 'react'
import AnnotationListItem from './AnnotationListItem'

const AnnotationList = function ({ annotations }) {
  return annotations.map((annotation, index) => (
    <AnnotationListItem key={annotation._id} annotation={annotation} index={index} />
  ))
}

export default AnnotationList
