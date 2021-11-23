import { useEffect, useRef, useState } from 'react'

import ReactQuill, { Quill } from 'react-quill'
import QuillCursors from 'quill-cursors'
import { QuillBinding } from 'y-quill'
import 'react-quill/dist/quill.snow.css'

import axios from 'axios'

//  Register Quill modules
Quill.register('modules/cursors', QuillCursors, false)

const snapshotId = '619cbbc19caecffdfbb25d0c'

const AnnotationEditor = ({ yDoc, provider, currentAnnotation, ...props }) => {
  // States
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  // Refs
  const quillTitleRef = useRef(undefined)
  const reactQuillTitleRef = useRef(undefined)
  const quillDescriptionRef = useRef(undefined)
  const reactQuillDescriptionRef = useRef(undefined)

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

  // Setup Quill editors & Yjs Bindings
  useEffect(() => {
    console.log('Editor useEffect!')

    attachRefs()
    const yTitle = yDoc.getText(currentAnnotation ? currentAnnotation._id + '-title' : 'title')
    const yDescription = yDoc.getText(currentAnnotation ? currentAnnotation._id + '-description' : 'description')
    const quillTitleBinding = new QuillBinding(yTitle, quillTitleRef.current, provider.awareness)
    const quillDescriptionBinding = new QuillBinding(yDescription, quillDescriptionRef.current, provider.awareness)

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

      if (provider.synced) {
        initializeText()
      } else {
        provider.once('synced', initializeText)
      }
    }

    // Cleanup after unmounting component
    return () => {
      quillTitleBinding.destroy()
      quillDescriptionBinding.destroy()
    }
  }, [currentAnnotation, yDoc, provider])

  return (
    <div>
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
            const response = await axios({
              method: currentAnnotation ? 'PUT' : 'POST',
              url: `http://localhost:5000/snapshots/${snapshotId}/annotations/${
                currentAnnotation ? currentAnnotation._id : ''
              }`,
              data: {
                title,
                description,
              },
            })

            yDoc.getArray(`${snapshotId}-annotations`).insert(0, [response.data])

            console.log('Annotation posted!', response.data)
          } catch (err) {
            console.log(err)
          }
        }}
      >
        {currentAnnotation ? 'Save' : 'Create'}
      </button>
    </div>
  )
}

export { AnnotationEditor }
