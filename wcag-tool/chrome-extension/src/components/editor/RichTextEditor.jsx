import ReactQuill, { Quill } from 'react-quill'
import React, { useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import { useFormikContext } from 'formik'
import QuillCursors from 'quill-cursors'
import { QuillBinding } from 'y-quill'
import { v4 as uuid } from 'uuid'
import { useYjs, useOptions } from '../../hooks'
import { getRandomColor } from '../../utils'

Quill.register('modules/cursors', QuillCursors, false)

const cursorColor = getRandomColor()

const RichTextEditor = function ({ field, placeholder, selectedAnnotationId }) {
  const { ydoc, provider } = useYjs()
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const options = useOptions()

  // Refs
  const quillRef = useRef(undefined)
  const reactQuillRef = useRef(undefined)

  const attachRefs = () => {
    if (typeof reactQuillRef.current.getEditor !== 'function') return
    quillRef.current = reactQuillRef.current.getEditor()
  }

  useEffect(() => {
    provider.awareness.setLocalStateField('user', {
      name: options.username || 'Unknown user',
      color: cursorColor,
    })
  }, [option.username])

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
    const yId = selectedAnnotationId
      ? `${field.name}-${selectedAnnotationId}`
      : `${field.name}-${uuid()}`
    const yText = ydoc.getText(yId)
    const quillBinding = new QuillBinding(yText, quillRef.current, provider.awareness)

    if (selectedAnnotationId) {
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
  }, [ydoc, provider, selectedAnnotationId])

  useEffect(() => {
    // https://stackoverflow.com/questions/38936594/dynamically-change-quill-placeholder LOOOOOOOOOOOOOOOOOOOOOL

    const selector = `#${field.name}-editor > div.ql-container.ql-snow > div.ql-editor`
    const element = document.querySelector(selector)
    element.setAttribute('data-placeholder', placeholder)
  }, [placeholder])

  return (
    <div
      onBlur={() => {
        setFieldTouched(field.name, true)
      }}
    >
      <ReactQuill
        id={`${field.name}-editor`}
        modules={modules}
        value={field.value}
        placeholder={placeholder}
        onChange={(value) => {
          setFieldValue(field.name, value)
        }}
        ref={reactQuillRef}
        className="bg-white text-base font-normal"
      />
    </div>
  )
}

export default RichTextEditor
