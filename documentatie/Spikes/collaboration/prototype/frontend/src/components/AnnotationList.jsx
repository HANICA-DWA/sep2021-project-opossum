import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const snapshotId = '619cbbc19caecffdfbb25d0c'

const AnnotationList = ({ yDoc, provider, setCurrentAnnotation, ...props }) => {
  const [annotations, setAnnotations] = useState([])
  const yAnnotationsRef = useRef(yDoc.getArray(`${snapshotId}-annotations`))

  const loadAnnotations = async () => {
    const { data } = await axios.get(`http://localhost:5000/snapshots/${snapshotId}/annotations`)

    // Calculate difference between local and fetched annotations
    const difference = [...yAnnotationsRef.current.toArray(), ...data].filter(
      (val) => !yAnnotationsRef.current.toArray().some((_val) => _val._id === val._id)
    )

    if (difference.length > 0) yAnnotationsRef.current.insert(0, difference) // Update shared state

    setAnnotations(yAnnotationsRef.current.toArray())
  }

  // ComponentDidMount
  useEffect(() => {
    // Initialize react state
    if (provider.synced) {
      loadAnnotations()
    } else {
      provider.once('synced', loadAnnotations)
    }

    // Add observer to sync react and Yjs state
    yAnnotationsRef.current.observe((event, transaction) => {
      console.log('array changed!')
      setAnnotations(yAnnotationsRef.current.toArray())
    })

    // ComponentWillUnmount
    return () => {
      // TODO: Error vragen aan docent: [yjs] Tried to remove event handler that doesn't exist.
      yAnnotationsRef.current.unobserve((event, transaction) => {
        console.log('array unobserved!')
      })
    }
  }, [yDoc, provider])
  let i = 0
  return (
    <div>
      <h2>Annotation List</h2>

      <div style={{ border: '2px dashed blue' }}>
        <button onClick={() => yAnnotationsRef.current.delete(0, yAnnotationsRef.current.length)}>Clear Items</button>
        <button
          onClick={() => {
            yAnnotationsRef.current.insert(0, [{ _id: '123213', title: 'titel!', description: 'beschrijving!' }])
          }}
        >
          Add item
        </button>
      </div>

      <ul>
        {annotations &&
          annotations.map((annotation) => (
            <li key={annotation._id + i++} onClick={() => setCurrentAnnotation(annotation)}>
              {annotation._id} | {annotation.title} | {annotation.description}{' '}
            </li>
          ))}
      </ul>
    </div>
  )
}

export { AnnotationList }
