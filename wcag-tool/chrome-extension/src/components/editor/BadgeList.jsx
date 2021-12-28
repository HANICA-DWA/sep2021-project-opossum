import React from 'react'
import { useYAnnotations } from '../../hooks'
import BadgeListItem from './BadgeListItem'

export default function BadgeList() {
  const { annotations } = useYAnnotations()
  const iframeDocument = window.document.getElementById('editor').contentWindow.document

  return (
    <div className="page-mask">
      {annotations.map((annotation, index) => (
        <BadgeListItem
          key={annotation._id}
          annotation={annotation}
          index={index}
          iframeDoc={iframeDocument}
        />
      ))}
    </div>
  )
}
