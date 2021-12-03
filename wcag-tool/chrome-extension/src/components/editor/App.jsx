import React from 'react'
import { useSelector } from 'react-redux'
import OverlayButton from './OverlayButton'
import AnnotationListSlider from './AnnotationListSlider'
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'
import IFrameWrapper from './IFrameWrapper'
import { selectorSelectedAnnotation } from '../../services/annotationSlice'

const App = () => {
  const annotation = useSelector(selectorSelectedAnnotation)
  return (
    <>
      <OverlayButton />
      <AnnotationListSlider />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider annotation={annotation} />
      <IFrameWrapper />
    </>
  )
}

export default App
