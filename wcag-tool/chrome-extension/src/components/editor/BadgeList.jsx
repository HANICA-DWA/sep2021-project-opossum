import React from 'react'
import BadgeListItem from './BadgeListItem'

export default function BadgeList({ annotations }) {
  const iframeDocument = window.document.getElementById('snapshot-iframe').contentWindow.document

  // keeping track of any duplicate selectors so we can position badges correctly
  const map = new Map()
  const annotationsWithCount = annotations.map((annotation) => {
    if (map.has(annotation.selector)) {
      map.set(annotation.selector, map.get(annotation.selector) + 1)
    } else {
      map.set(annotation.selector, 1)
    }

    return { ...annotation, count: map.get(annotation.selector) }
  })

  return annotationsWithCount.map((annotation, index) => (
    <BadgeListItem
      key={annotation._id}
      annotation={annotation}
      index={index}
      iframeDoc={iframeDocument}
    />
  ))
}
