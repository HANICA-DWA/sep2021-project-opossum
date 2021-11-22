import { useEffect, useRef, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import QuillCursors from 'quill-cursors'

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { QuillBinding } from 'y-quill'

import axios from 'axios'

//  Register Quill modules
Quill.register('modules/cursors', QuillCursors, false)

const AnnotationEditor = ({ currentAnnotation, ...props }) => {
  // States
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Refs
  const quillTitleRef = useRef(undefined)
  const reactQuillTitleRef = useRef(undefined)
  const quillDescriptionRef = useRef(undefined)
  const reactQuillDescriptionRef = useRef(undefined)
  const providerRef = useRef(undefined)

  const attachRefs = () => {
    if (
      typeof reactQuillTitleRef.current.getEditor !== 'function' ||
      typeof reactQuillDescriptionRef.current.getEditor !== 'function'
    )
      return

    quillTitleRef.current = reactQuillTitleRef.current.getEditor()
    quillDescriptionRef.current = reactQuillDescriptionRef.current.getEditor()
  }

  // Quill modules
  const modules = {
    cursors: true,
    toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic']],
    history: {
      userOnly: true,
    },
  }

  // Setup Yjs
  useEffect(() => {
    console.log('Editor useEffect!')

    attachRefs()

    const yDoc = new Y.Doc()
    setName(yDoc.clientID)
    const yTitle = yDoc.getText(currentAnnotation ? currentAnnotation._id + '-title' : 'title')
    const yDescription = yDoc.getText(currentAnnotation ? currentAnnotation._id + '-description' : 'description')
    if (!providerRef.current) providerRef.current = new WebsocketProvider('ws://localhost:5000', '1', yDoc)

    new QuillBinding(yTitle, quillTitleRef.current, providerRef.current.awareness)
    new QuillBinding(yDescription, quillDescriptionRef.current, providerRef.current.awareness)

    // Initialize editor content if an anotation is chosen
    if (currentAnnotation) {
      const initializeText = () => {
        if (yTitle.toString() === '') {
          setTitle(currentAnnotation.title)
        }
        if (yDescription.toString() === '') {
          setDescription(currentAnnotation.description)
        }
      }

      if (providerRef.current.synced) {
        initializeText()
      } else {
        providerRef.current.once('synced', initializeText)
      }
    }

    return () => {
      if (providerRef.current) providerRef.current.destroy()
      providerRef.current = undefined
      yDoc.destroy()
    }
  }, [currentAnnotation])

  // Setup/update awareness
  const [name, setName] = useState('Tarzan')
  const [color, setColor] = useState('blue')
  const [clients, setClients] = useState([])

  useEffect(() => {
    console.log('Awareness useEffect!')

    if (providerRef.current) {
      const awareness = providerRef.current.awareness

      // Listen to awareness changes
      awareness.on('change', () => {
        const _clients = []
        awareness.getStates().forEach((state) => {
          if (state.user) _clients.push({ ...state.user })
        })
        setClients(_clients)
      })

      // Set awareness information
      awareness.setLocalStateField('user', {
        name: name,
        color: color,
      })
    }
  }, [name, color])

  return (
    <>
      <div style={{ border: '2px solid orange', margin: '2rem' }}>
        <h2>Awareness</h2>

        <ul>
          {clients.map((client) => (
            <li key={client.name} style={{ color: client.color }}>
              {client.name}
            </li>
          ))}
        </ul>
        <input onChange={(event) => setName(event.target.value)} value={name} placeholder="name" />
        <input onChange={(event) => setColor(event.target.value)} value={color} placeholder="css color" />
      </div>

      <div style={{ border: '2px solid red', margin: '2rem' }}>
        <h2>Annotation Editor</h2>
        <ReactQuill
          modules={modules}
          value={title}
          onChange={setTitle}
          ref={reactQuillTitleRef}
          placeholder="Start collaborating..."
          theme="snow"
        />
        <ReactQuill
          modules={modules}
          value={description}
          onChange={setDescription}
          ref={reactQuillDescriptionRef}
          placeholder="Start collaborating..."
          theme="snow"
        />
        <button
          onClick={async () => {
            try {
              let response
              if (currentAnnotation) {
                response = await axios.put('http://localhost:5000/annotations/' + currentAnnotation._id, {
                  title,
                  description,
                })
              } else {
                response = await axios.post('http://localhost:5000/annotations', {
                  title,
                  description,
                })
              }

              console.log('Annotation posted!', response.data)
            } catch (err) {
              console.log(err)
            }
          }}
        >
          {currentAnnotation ? 'Save' : 'Create'}
        </button>
      </div>
    </>
  )
}

export { AnnotationEditor }
