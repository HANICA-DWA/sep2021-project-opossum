import React from 'react'
import OverlayButton from './OverlayButton'
import AnnotationListSlider from './AnnotationListSlider'
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'

const App = () => {
  return (
    <>
      <OverlayButton />
      <AnnotationListSlider />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider />
    </>
  )
}

export default App
