import React from 'react'
import { useSelector } from 'react-redux'
import {
  OverlayButton,
  AnnotationBadge,
  AnnotationSlider,
  CreateAnnotationSlider,
  IFrameWrapper,
} from '../components'
import { selectAnnotations } from '../services/annotationSlice'

const App = function () {
  const annotations = useSelector(selectAnnotations)
  console.log(annotations)

  return (
    <>
      <OverlayButton />
      <AnnotationSlider />
      <CreateAnnotationSlider />

      <IFrameWrapper badge={<AnnotationBadge x={150} y={250} />} />
    </>
  )
}

export { App }
