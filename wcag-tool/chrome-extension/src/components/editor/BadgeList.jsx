import React from 'react'
import BadgeListItem from './BadgeListItem'
import { useSliders } from '../../hooks'

export default function BadgeList({ annotations }) {
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

  const [, { anySliderOpen }] = useSliders()

  return (
    <div className={`pointer-events-none absolute transition-left w-full h-full ${anySliderOpen ? 'left-400' : 'left-0'}`}>
      {annotationsWithCount.map((annotation, index) => (
        <BadgeListItem key={annotation._id} annotation={annotation} index={index} />
      ))}
    </div>
  )
}
