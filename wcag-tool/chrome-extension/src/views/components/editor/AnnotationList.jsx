import React from 'react'
import { Annotation } from '.'

const AnnotationList = function ({ annotations }) {
  return annotations.map(({ title, description, selector }) => (
    <Annotation
      key={title}
      title={title}
      description={description}
      selector={selector}
    />
  ))
}

export { AnnotationList }
