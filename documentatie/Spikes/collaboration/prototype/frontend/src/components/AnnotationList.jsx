import axios from 'axios'
import { useEffect, useState } from 'react'

const AnnotationList = ({ setCurrentAnnotation, ...props }) => {
  const [annotations, setAnnotations] = useState([])

  useEffect(() => {
    console.log('List useEffect!')

    fetchAnnotations()
  }, [])

  const fetchAnnotations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/annotations')
      setAnnotations(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Annotation List</h2>

      <button onClick={fetchAnnotations}>refetch</button>

      <ul>
        {annotations.map((annotation) => (
          <li key={annotation._id} onClick={() => setCurrentAnnotation(annotation)}>
            {annotation._id} | {annotation.title} | {annotation.description}{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { AnnotationList }
