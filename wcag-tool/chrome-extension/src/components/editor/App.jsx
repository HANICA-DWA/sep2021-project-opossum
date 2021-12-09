import React from 'react'
import { useYjs } from '../../hooks'

import OverlayButton from './OverlayButton'
import AnnotationListSlider from './AnnotationListSlider'
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'
import Awareness from './Awareness'

const App = () => {
  const { ydoc, provider } = useYjs()
  return (
    <>
      <Awareness provider={provider} clientId={ydoc.clientID} />
      <OverlayButton />
      <AnnotationListSlider />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider />
    </>
  )
}

export default App
