import React from 'react'
import OverlayButton from './OverlayButton'
import AnnotationSlider from './AnnotationSlider'
import CreateAnnotationSlider from './CreateAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'
import EditAnnotationSlider from './EditAnnotationSlider'
import IFrameWrapper from './IFrameWrapper'

const App = () => {
  return (
    <div className="font-poppins text-gray-900">
      <OverlayButton />
      <AnnotationSlider />
      <CreateAnnotationSlider />
      <AnnotationDetailSlider />
      <EditAnnotationSlider />
      <IFrameWrapper />
    </ div>
  )
}

export default App
