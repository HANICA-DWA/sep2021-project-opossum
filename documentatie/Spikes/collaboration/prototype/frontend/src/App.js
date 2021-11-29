import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

import { AnnotationEditor } from './components/AnnotationEditor'
import { AnnotationList } from './components/AnnotationList'
import { Awareness } from './components/Awareness'

// TODO: Vragen aan docent: wanneer ik websocket in useRef gebruikt wordt deze 2 maal initialiseerd.
const yDoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:5000', 'room', yDoc)

const App = () => {
  const [currentAnnotation, setCurrentAnnotation] = useState(undefined)

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
      <div style={{ border: '2px solid blue', margin: '1rem', padding: '1rem' }}>
        <Awareness provider={provider} clientId={yDoc.clientID} />
      </div>

      {currentAnnotation && (
        <div style={{ border: '2px solid green', margin: '1rem', padding: '1rem' }}>
          <h2>Current annotation</h2>
          <p>
            <strong>_id</strong> {currentAnnotation._id}
          </p>
          <p>
            <strong>title</strong> <span dangerouslySetInnerHTML={{ __html: currentAnnotation.title }} />
          </p>
          <p>
            <strong>description</strong> <span dangerouslySetInnerHTML={{ __html: currentAnnotation.description }} />
          </p>
        </div>
      )}

      <div style={{ border: '2px solid red', margin: '1rem', padding: '1rem' }}>
        <AnnotationList
          yDoc={yDoc}
          provider={provider}
          currentAnnotation={currentAnnotation}
          setCurrentAnnotation={setCurrentAnnotation}
        />
      </div>

      <div style={{ border: '2px solid blue', margin: '1rem', padding: '1rem' }}>
        <AnnotationEditor
          yDoc={yDoc}
          provider={provider}
          currentAnnotation={currentAnnotation}
          setCurrentAnnotation={setCurrentAnnotation}
        />
      </div>
    </>
  )
}

export default App
