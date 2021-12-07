import React from 'react'
import { useEffect } from 'react'
import OverlayButton from './OverlayButton'
import AnnotationListSlider from './AnnotationListSlider'
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'
import IFrameWrapper from './IFrameWrapper'

import Awareness from '../common/Awareness'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

const yDoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:5000', 'room', yDoc)

const App = () => {
  // ComponentDidMount
  useEffect(() => {
    // ComponentWillUnmount
    return () => {
      provider.destroy()
      yDoc.destroy()
    }
  }, [])

  return (
    <>
      <Awareness provider={provider} clientId={yDoc.clientID} />
      <OverlayButton />
      <AnnotationListSlider />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider />
      <IFrameWrapper />
    </>
  )
}

export default App
