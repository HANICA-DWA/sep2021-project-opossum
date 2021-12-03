import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { AnnotationForm } from './AnnotationForm'

import { useCreateAnnotation, useUpdateAnnotation, useSliders, useAnnotation } from '../../hooks'

const CreateAndEditAnnotationSlider = () => {
  const [createAnnotation, { error: createError }] = useCreateAnnotation() // TODO: Show errors!
  const [updateAnnotation, { error: updateError }] = useUpdateAnnotation()
  const { selectedAnnotation, selectedAnnotationId } = useAnnotation()
  const [{ openListSlider, openDetailsSlider }, { createAndEditSliderIsOpen }] = useSliders()

  return (
    <SlidingPane
      className="hide-default-close"
      closeIcon={<div />}
      onRequestClose={
        selectedAnnotationId
          ? () => openDetailsSlider(selectedAnnotationId)
          : () => openListSlider()
      }
      isOpen={createAndEditSliderIsOpen}
      title={
        <div className="grid grid-flow-col justify-between">
          <span className="text-gray-900 text-base font-poppins">
            {`${selectedAnnotation?._id ? 'Edit' : 'Create'} Annotation`}
          </span>

          <button
            className="text-gray-600 px-4 py-1"
            onClick={
              selectedAnnotationId
                ? () => openDetailsSlider(selectedAnnotationId)
                : () => openListSlider()
            }
          >
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
      width="400px"
    >
      {createError && <h1>CREATE ERROR!</h1>}

      {updateError && <h1>UPDATE ERROR!</h1>}

      <AnnotationForm
        selectedAnnotation={selectedAnnotation}
        handleCreate={createAnnotation}
        handleUpdate={updateAnnotation}
      />
    </SlidingPane>
  )
}

export default CreateAndEditAnnotationSlider
