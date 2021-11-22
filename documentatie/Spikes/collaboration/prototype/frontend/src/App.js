import { useState } from 'react'
import { AnnotationEditor } from './components/AnnotationEditor'
import { AnnotationList } from './components/AnnotationList'

function App() {
  const [currentAnnotation, setCurrentAnnotation] = useState(undefined)

  return (
    <>
      <div style={{ border: '2px solid green', margin: '2rem' }}>
        <h2>Current annotation</h2>
        {currentAnnotation && JSON.stringify(currentAnnotation)}
      </div>

      <div style={{ border: '2px solid red', margin: '2rem' }}>
        <AnnotationList setCurrentAnnotation={setCurrentAnnotation} />
      </div>

      <div style={{ border: '2px solid blue', margin: '2rem' }}>
        <AnnotationEditor currentAnnotation={currentAnnotation} />
      </div>
    </>
  )
}

export default App
