import ReactQuill, { Quill } from 'react-quill'
import React, { useState, useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useYjs } from '../../hooks'
import { useFormikContext } from 'formik'

const RichTextEditor = function ({ field, form, ...props }) {
  const { yDoc, provider } = useYjs()

  const {
    values: { description },
    setFieldValue,
  } = useFormikContext()

  // States
  const [text, setText] = useState('')

  // Refs
  const quillRef = useRef(undefined)
  const reactQuillRef = useRef(undefined)

  const attachRefs = () => {
    if (typeof reactQuillRef.current.getEditor !== 'function') return
    quillRef.current = reactQuillRef.current.getEditor()
  }

  // Quill modules
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic']],
    history: {
      userOnly: true,
    },
  }

  useEffect(() => {
    attachRefs()

    // Cleanup before unmounting
    return () => {
      ;(quillRef.current = undefined), (reactQuillRef.current = undefined)
    }
  }, [])

  return (
    <ReactQuill
      {...field}
      {...props}
      modules={modules}
      value={description}
      onChange={(value) => {
        setFieldValue(field.name, value)
      }}
      ref={reactQuillRef}
      placeholder="Description"
    />
  )
}

export default RichTextEditor
