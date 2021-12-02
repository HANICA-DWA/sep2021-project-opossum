import React from 'react'
import Annotation from './Annotation'

const AnnotationList = function ({ annotations }) {
  return annotations.map((annotation) => (
    <Annotation key={annotation._id} annotation={annotation} />
  ))
}

export default AnnotationList
