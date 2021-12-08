import ReactQuill, { Quill } from 'react-quill'
import React, { useState, useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useYjs } from '../../hooks'

const RichTextEditor = function () {
  const { yDoc, provider } = useYjs()

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
      modules={modules}
      value={text}
      onChange={setText}
      ref={reactQuillRef}
      placeholder="Description"
      theme="snow"
    />
  )
}

export default RichTextEditor
