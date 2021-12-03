import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'

import { AnnotationForm } from './AnnotationForm'

import { useAddAnnotationMutation, useUpdateAnnotationMutation } from '../../services/apiService'
import {
  unsetNewAnnotationSelector,
  // selectorNewAnnotation,
  setSelectedAnnotation,
  selectorSelectedAnnotation,
} from '../../services/annotationSlice'
import {
  selectorCreateSliderIsOpen,
  setCreateSliderIsOpen,
  setDetailSliderIsOpen,
  setListSliderIsOpen,
} from '../../services/slidersSlice'

const CreateAndEditAnnotationSlider = ({ annotation }) => {
  const dispatch = useDispatch()

  const [addAnnotation] = useAddAnnotationMutation()
  const [updateAnnotation] = useUpdateAnnotationMutation()

  const isOpen = useSelector(selectorCreateSliderIsOpen)
  const selectedAnnotation = useSelector(selectorSelectedAnnotation)
  // const selector = useSelector(selectorNewAnnotation)
  const { newAnnotationSelector } = useSelector((state) => state.annotation)

  const closeSlider = () => {
    dispatch(setCreateSliderIsOpen(false))
    dispatch(setListSliderIsOpen(true))
  }

  const handleCreate = (successCriteriumId, title, description) => {
    closeSlider()

    addAnnotation({
      snapshotId: '61a9f47fe84cdb57824daed3', // TODO: Replace snapshotId!
      newAnnotation: { successCriteriumId, title, description, selector: newAnnotationSelector },
    })
      .unwrap()
      .then((newAnnotation) => {
        console.log(newAnnotation)
        dispatch(unsetNewAnnotationSelector())
        dispatch(setSelectedAnnotation(newAnnotation))
        dispatch(setDetailSliderIsOpen(true))
      })
      .catch((e) => console.log(e))
  }

  const handleUpdate = (_id, fields) => {
    closeSlider()
    updateAnnotation({
      snapshotId: '61a9f47fe84cdb57824daed3', // TODO: Replace snapshotId!
      annotationId: annotation._id,
      newFields: { ...fields, selector: newAnnotationSelector },
    })
      .unwrap()
      .then((updatedAnnotation) => {
        dispatch(setSelectedAnnotation(updatedAnnotation))
      })
      .catch((e) => console.log(e))
  }

  return (
    <SlidingPane
      className="hide-default-close"
      closeIcon={<div />}
      isOpen={isOpen}
      title={
        <div className="grid grid-flow-col justify-between">
          <span className="text-gray-900 text-base font-poppins">
            {`${annotation ? 'Edit' : 'Create'} Annotation`}
          </span>
          <button className="text-gray-600 px-4 py-1" onClick={() => closeSlider()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      }
      from="left"
      onRequestClose={() => closeSlider()}
      width="400px"
    >
      <AnnotationForm
        selectedAnnotation={selectedAnnotation}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
      />
    </SlidingPane>
  )
}

export default CreateAndEditAnnotationSlider
