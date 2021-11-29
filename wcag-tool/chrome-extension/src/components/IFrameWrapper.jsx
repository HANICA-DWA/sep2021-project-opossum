import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import unique from 'unique-selector'
import {
  setSelectElement,
  setCreateSliderIsOpen,
  selectSelectElement,
  addNewAnnotation,
  selectHighlightElement,
} from '../services/annotationSlice'

// eslint-disable-next-line react/function-component-definition
const IFrameWrapper = function () {
  const selectElement = useSelector(selectSelectElement)
  const iframeDoc = useRef(undefined)
  const dispatch = useDispatch()
  const highlightElement = useSelector(selectHighlightElement)

  const removeLink = (element) => {
    if (element.tagName === 'A') {
      element.removeAttribute('href')
    }
  }

  const addBorder = (e) => {
    e.target.style.border = '1px solid red'
  }

  const removeBorder = (e) => {
    e.target.style.border = 'none'
  }

  const createNewAnnotation = function (e) {
    if (e.target !== this) {
      return
    }

    e.target.style.border = 'none'
    dispatch(setSelectElement(false))
    dispatch(setCreateSliderIsOpen(true))

    const selector = unique(e.target)

    dispatch(addNewAnnotation({ selector }))
  }

  const createNewAnnotationOnClick = (element) => {
    element.addEventListener('click', createNewAnnotation)
  }

  const AddBorderOnHover = (element) => {
    element.addEventListener('mouseover', addBorder)
    element.addEventListener('mouseout', removeBorder)
  }

  const RemoveEventListeners = (element) => {
    element.removeEventListener('mouseover', addBorder)
    element.removeEventListener('mouseout', removeBorder)
    element.removeEventListener('click', createNewAnnotation)
  }

  useEffect(() => {
    iframeDoc.current = document.getElementById('myframe')

    iframeDoc.current.addEventListener('load', function () {
      // eslint-disable-next-line react/no-this-in-sfc
      const Snapshotdocument = this.contentWindow.document
      const elements = Snapshotdocument.querySelectorAll('*')
      elements.forEach((element) => {
        removeLink(element)
      })
    })

    return () => {
      iframeDoc.current.removeEventListener('load')
      iframeDoc.current = undefined
    }
  }, [])

  useEffect(() => {
    if (iframeDoc.current) {
      if (selectElement) {
        const elements =
          iframeDoc.current.contentWindow.document.querySelectorAll('*')
        elements.forEach((element) => {
          AddBorderOnHover(element)
          createNewAnnotationOnClick(element)
        })
      } else {
        const elements =
          iframeDoc.current.contentWindow.document.querySelectorAll('*')
        elements.forEach((element) => {
          RemoveEventListeners(element)
        })
      }
    }

    return () => {
      const elements =
        iframeDoc.current.contentWindow.document.querySelectorAll('*')
      elements.forEach((element) => {
        RemoveEventListeners(element)
      })
    }
  }, [selectElement])

  // highlight element based on selector in useEffect
  useEffect(() => {
    if (iframeDoc.current) {
      if (highlightElement) {
        const element =
          iframeDoc.current.contentWindow.document.querySelector(
            highlightElement
          )
        if (element) {
          element.style.border = '1px solid red'
        }
      } else {
        const elements =
          iframeDoc.current.contentWindow.document.querySelectorAll('*')
        elements.forEach((element) => {
          element.style.border = 'none'
        })
      }
    }
  }, [highlightElement])

  return (
    <iframe
      id="myframe"
      title="snapshot"
      src="./html.html"
      className="h-screen w-full"
    />
  )
}

export { IFrameWrapper }
