import React from 'react'
import AnnotationListItem from './AnnotationListItem'

const AnnotationList = function ({ annotations }) {
  return annotations.map(({ title, description, selector, _id }) => (
    <AnnotationListItem key={_id} title={title} description={description} selector={selector} />
  ))
}

export default AnnotationList
