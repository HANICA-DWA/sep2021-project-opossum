import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import unique from 'unique-selector'
import { useSliders } from '../../hooks'

const ReactDOM = require('react-dom')
const axe = require('@axe-core/react')

const IFrameWrapper = function () {
  // eslint-disable-next-line no-empty-pattern
  const [{ openCreateAndEditSlider }, { elementSelectorIsOpen }] = useSliders()
  const { highlightedElementSelector } = useSelector((state) => state.annotation)

  const iframeDoc = useRef(undefined)

  // run axe core analyses on document object of iframe
  useEffect(() => {
    console.log('iframeDoc', iframeDoc.current)
  }, [iframeDoc])

  const removeLink = (element) => {
    if (element.tagName === 'A') {
      element.removeAttribute('href')
    }
  }

  const addBorder = (e) => {
    e.target.style.outline = '3px solid blue'
  }

  const removeBorder = (e) => {
    e.target.style.outline = 'none'
  }

  const createNewAnnotation = function (e) {
    if (e.target !== this) return

    const selector = unique(e.target)
    openCreateAndEditSlider(selector)
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

    iframeDoc.current.addEventListener('load', async function () {
      // eslint-disable-next-line react/no-this-in-sfc
      const Snapshotdocument = this.contentWindow.document

      const elements = Snapshotdocument.body.querySelectorAll('*')

      axe(React, ReactDOM, 1000)
        .then((results) => {
          console.log('results', results)
        })
        .catch((err) => {
          console.log('err', err)
        })

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
      if (elementSelectorIsOpen) {
        const elements = iframeDoc.current.contentWindow.document.querySelectorAll('*')
        elements.forEach((element) => {
          AddBorderOnHover(element)
          createNewAnnotationOnClick(element)
        })
      } else {
        const elements = iframeDoc.current.contentWindow.document.querySelectorAll('*')
        elements.forEach((element) => {
          RemoveEventListeners(element)
        })
      }
    }

    return () => {
      const elements = iframeDoc.current.contentWindow.document.querySelectorAll('*')
      elements.forEach((element) => {
        RemoveEventListeners(element)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementSelectorIsOpen])

  // highlight element based on selector in useEffect
  useEffect(() => {
    if (iframeDoc.current) {
      if (highlightedElementSelector) {
        // TODO: figure out why this crashed when 'highlightedElementSelector' is not a valid selector like '543teafdsf36tdgdfs'
        try {
          const element = iframeDoc.current.contentWindow.document.querySelector(
            highlightedElementSelector
          )
          if (element) {
            element.style.outline = '3px solid blue'
          }
        } catch (error) {
          console.log(`Not a valid selector!! ${highlightedElementSelector}`)
        }
      } else {
        const elements = iframeDoc.current.contentWindow.document.querySelectorAll('*')
        elements.forEach((element) => {
          element.style.outline = 'none'
        })
      }
    }
  }, [highlightedElementSelector])

  return <iframe id="myframe" title="snapshot" src="./html.html" className="h-screen w-full" />
}

export default IFrameWrapper
