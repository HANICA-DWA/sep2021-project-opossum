import React, { useState } from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  addAnnotation,
  selectNewAnnotation,
  selectCreateSliderIsOpen,
  setCreateSliderIsOpen,
  resetNewAnnotation,
  setListSliderIsOpen,
} from '../services/annotationSlice'

const CreateAnnotationSlider = function () {
  const isOpen = useSelector(selectCreateSliderIsOpen)
  const dispatch = useDispatch()
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const newAnnotation = useSelector(selectNewAnnotation)

  return (
    <SlidingPane
      closeIcon={
        <svg
          onClick={() => dispatch(setCreateSliderIsOpen(false))}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 18 18"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      }
      isOpen={isOpen}
      title={
        <div className="grid grid-cols-6 rounded-l">
          <div className="col-span-5">
            <p className="text-base font-medium text-gray-900">
              Create annotation
            </p>
          </div>
        </div>
      }
      from="left"
      onRequestClose={() => dispatch(setCreateSliderIsOpen(false))}
      width="400px"
    >
      <form>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
            <input
              onChange={(e) => settitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
            />
          </label>
        </div>
        <div className="form-control">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
            <textarea
              onChange={(e) => setdescription(e.target.value)}
              rows="10"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
            />
          </label>
        </div>
        <button
          onClick={() => {
            dispatch(setCreateSliderIsOpen(false))
            dispatch(
              addAnnotation({
                title,
                description,
                selector: newAnnotation.selector,
              })
            )
            settitle('')
            setdescription('')
            dispatch(resetNewAnnotation())
            dispatch(setListSliderIsOpen(true))
          }}
          type="button"
          className="p-2 pl-5 pr-5 bg-green-600 text-gray-100 text-lg rounded-lg focus:border-4 border-green-300"
        >
          Create annotation
        </button>
      </form>
    </SlidingPane>
  )
}

export { CreateAnnotationSlider }
