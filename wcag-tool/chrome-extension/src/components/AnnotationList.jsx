import React from 'react'
import { Annotation } from '.'

const AnnotationList = function ({ annotations }) {
  return annotations.map((annotation) => (
    <Annotation
      key={Math.random()}
      title={annotation.title}
      description={annotation.description}
      selector={annotation.selector}
    />
  ))
}

export { AnnotationList }
