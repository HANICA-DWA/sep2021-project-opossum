import React from 'react'
import NoAnnotation from './NoAnnotation'
import AnnotationListItem from './AnnotationListItem'
import { useAnnotation } from '../../hooks'

const AnnotationList = function () {
  const { annotations } = useAnnotation()

  if (!annotations || annotations.length <= 0) return <NoAnnotation />

  return (
    <>
      <div>
        <button type="button" onClick={() => alert('clear!')}>
          Clear shared state
        </button>
        <button type="button" onClick={() => alert('add!')}>
          Add annotation
        </button>
      </div>
      {annotations.map((annotation) => (
        <AnnotationListItem key={annotation._id} annotation={annotation} />
      ))}
    </>
  )
}

export default AnnotationList
