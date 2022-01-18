import { useEffect, useRef, useState } from 'react'
import axios from 'axios'

const snapshotId = '619fe1f637745026fc33fb2e'

const AnnotationList = ({ yDoc, provider, currentAnnotation, setCurrentAnnotation, ...props }) => {
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

  useEffect(() => {
    if (provider.synced) {
      loadAnnotations()
    } else {
      provider.once('synced', loadAnnotations)
    }
  }, [currentAnnotation, provider])

  return (
    <div>
      <h2>Annotation List</h2>

      <div>
        <button onClick={() => yAnnotationsRef.current.delete(0, yAnnotationsRef.current.length)}>
          reset shared state
        </button>
        <button
          onClick={() => {
            yAnnotationsRef.current.insert(0, [{ _id: '123213', title: 'titel!', description: 'beschrijving!' }])
          }}
        >
          Add item to shared state
        </button>
        {currentAnnotation && (
          <button
            onClick={async () => {
              try {
                const response = await axios.delete(
                  `http://localhost:5000/snapshots/${snapshotId}/annotations/${currentAnnotation._id}`
                )
                alert('Snapshot deleted!')
                yAnnotationsRef.current.delete(currentAnnotation.index, 1) // Remove from Yjs doc, React listens to this change
                setCurrentAnnotation(undefined) // set current annotation
              } catch (err) {
                alert('error', err)
              }
            }}
          >
            delete current Annototation
          </button>
        )}
        <button
          onClick={() => {
            setCurrentAnnotation(undefined)
          }}
        >
          new Annotation
        </button>
      </div>

      <ul>
        {annotations &&
          annotations.map((annotation, index) => (
            <li
              key={annotation._id + index}
              style={{
                border: annotation._id === currentAnnotation?._id ? '5px solid purple' : '1px solid blue',
                margin: '10px',
              }}
              onClick={() => setCurrentAnnotation({ ...annotation, index })}
            >
              <strong>title: </strong> <span dangerouslySetInnerHTML={{ __html: annotation.title }} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export { AnnotationList }
