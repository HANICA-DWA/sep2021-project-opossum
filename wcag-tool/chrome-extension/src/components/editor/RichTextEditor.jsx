import ReactQuill, { Quill } from 'react-quill'
import React, { useState, useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useYjs } from '../../hooks'
import { useFormikContext } from 'formik'

const RichTextEditor = function ({ field, placeholder }) {
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
  }

  useEffect(() => {
    attachRefs()

    // Cleanup before unmounting
    return () => {
      ;(quillRef.current = undefined), (reactQuillRef.current = undefined)
    }
  }, [])

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
