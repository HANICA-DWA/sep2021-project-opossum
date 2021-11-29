import React from 'react'
import { useDispatch } from 'react-redux'
import {
  setListSliderIsOpen,
  setSelectElement,
} from '../services/annotationSlice'

const NoAnnotation = function () {
  const dispatch = useDispatch()
  return (
    <div className="flex justify-center">
      <div className="p-1 text-black">
        <div className="flex p-4 flex-col items-center">
          <div className="folderIcon m-2" />
          <p className="text-xl m-2">
            <b>No annotations</b>
          </p>
          <p className="m-2">Create an annotation and mark problems</p>
          <button
            type="button"
            className="p-0.5 px-4 m-2 mb-4 shadow border rounded-full bg-gray-50 border-gray-400 hover:bg-gray-200"
            onClick={() => {
              dispatch(setListSliderIsOpen(false))
              dispatch(setSelectElement(true))
            }}
          >
            Create annotation
          </button>
        </div>
      </div>
    </div>
  )
}

export { NoAnnotation }
