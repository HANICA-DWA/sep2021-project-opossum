import { useEffect, useRef, useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { AnnotationEditor } from './components/AnnotationEditor'
import { AnnotationList } from './components/AnnotationList'
import { Awareness } from './components/Awareness'

function App() {
  const [currentAnnotation, setCurrentAnnotation] = useState(undefined)

  // Setup Yjs
  // I use useRef to persist these vars between renders.
  const yDocRef = useRef(new Y.Doc())
  const providerRef = useRef(new WebsocketProvider('ws://localhost:5000', '1', yDocRef.current))

  useEffect(() => {
    console.log('App useEffect!')

    // Cleanup after unmounting component
    return () => {
      providerRef.current.destroy()
      providerRef.current = undefined
      yDocRef.current.destroy()
      yDocRef.current = undefined
    }
  }, [])
  return (
    <>
      <div style={{ border: '2px solid blue', margin: '1rem', padding: '1rem' }}>
        <Awareness provider={providerRef.current} clientId={yDocRef.current.clientID} />
      </div>

      <div style={{ border: '2px solid green', margin: '1rem', padding: '1rem' }}>
        <h2>Current annotation</h2>
        {currentAnnotation && JSON.stringify(currentAnnotation)}
      </div>

      <div style={{ border: '2px solid red', margin: '1rem', padding: '1rem' }}>
        <AnnotationList setCurrentAnnotation={setCurrentAnnotation} />
      </div>

      <div style={{ border: '2px solid blue', margin: '1rem', padding: '1rem' }}>
        <AnnotationEditor yDoc={yDocRef.current} provider={providerRef.current} currentAnnotation={currentAnnotation} />
      </div>
    </>
  )
}

export default App
