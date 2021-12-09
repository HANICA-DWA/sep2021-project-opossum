import ReactQuill, { Quill } from 'react-quill'
import React, { useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useFormikContext } from 'formik'
import QuillCursors from 'quill-cursors'
import { QuillBinding } from 'y-quill'
import { useYjs } from '../../hooks'
import { v4 as uuid } from 'uuid'

Quill.register('modules/cursors', QuillCursors, false)

const RichTextEditor = function ({ field, placeholder, annotationId }) {
  const { ydoc, provider } = useYjs()
  const { setFieldValue } = useFormikContext()

  // Refs
  const quillRef = useRef(undefined)
  const reactQuillRef = useRef(undefined)

  const attachRefs = () => {
    if (typeof reactQuillRef.current.getEditor !== 'function') return
    quillRef.current = reactQuillRef.current.getEditor()
  }

  // Quill modules
  const modules = {
    toolbar: field.name === 'title' ? false : [[{ header: [1, 2, 3, false] }], ['bold', 'italic']],
    history: {
      userOnly: true,
    },
    cursors: true,
  }

  useEffect(() => {
    attachRefs()
    const yId = annotationId ? `${field.name}-${annotationId}` : `${field.name}-${uuid()}`
    const yText = ydoc.getText(yId)
    const quillBinding = new QuillBinding(yText, quillRef.current, provider.awareness)

    console.log(yId)
    if (annotationId) {
      const initializeText = () => {
        if (yText.toString() === '') {
          setFieldValue(field.name, field.value)
        }
      }

      if (provider.synced) {
        initializeText()
      } else {
        provider.once('synced', initializeText)
      }
    }

    // Cleanup before unmounting
    return () => {
      quillBinding.destroy()
    }
  }, [ydoc, provider, annotationId])

  useEffect(() => {
    // https://stackoverflow.com/questions/38936594/dynamically-change-quill-placeholder LOOOOOOOOOOOOOOOOOOOOOL

    const selector = `#${field.name}-editor > div.ql-container.ql-snow > div.ql-editor`
    const element = document.querySelector(selector)
    element.setAttribute('data-placeholder', placeholder)
  }, [placeholder])

  return (
    <ReactQuill
      id={`${field.name}-editor`}
      modules={modules}
      value={field.value}
      placeholder={placeholder}
      onChange={(value) => setFieldValue(field.name, value)}
      ref={reactQuillRef}
    />
  )
}

export default RichTextEditor
