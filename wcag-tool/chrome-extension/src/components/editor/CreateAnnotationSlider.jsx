import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import AnnotationForm from './AnnotationForm'
import { selectCreateSliderIsOpen, setCreateSliderIsOpen } from '../../services/annotationSlice'

const CreateAnnotationSlider = function () {
  // const { data, error } = useGetSuccessCriteriaQuery()
  const isOpen = useSelector(selectCreateSliderIsOpen)
  const dispatch = useDispatch()

  // eslint-disable-next-line no-unused-vars
  const dummyAnnotation = {
    _id: 'testId',
    successCriterium: {
      successCriteriumId: 'WCAG2:audio-only-live',
    },
    title: 'titel',
    description: 'description',
    selector: 'selector',
  }

  return (
    <SlidingPane
      className="hide-default-close"
      closeIcon={<div />}
      isOpen={isOpen}
      title={
        <div className="grid grid-flow-col justify-between">
          <span className="text-gray-900 text-base font-poppins">Create annotation</span>
          <button
            className="text-gray-600 px-4 py-1"
            onClick={() => dispatch(setCreateSliderIsOpen(false))}
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
      onRequestClose={() => dispatch(setCreateSliderIsOpen(false))}
      width="400px"
    >
      <AnnotationForm
        // selectedAnnotation={dummyAnnotation}
        handleCreate={(successCriterium, title, description, selector) => {
          // TODO Add RTK Query mutation for Create Annotation
          // eslint-disable-next-line no-alert
          alert(
            `Create! \nfields: ${Object.keys({
              successCriterium,
              title,
              description,
              selector,
            }).toString()}`
          )
        }}
        handleUpdate={(_id, fields) => {
          // TODO Add RTK Query mutation for Update Annotation
          // eslint-disable-next-line no-alert
          alert(`Update! \nid: ${_id} \nfields: ${Object.keys(fields).toString()}`)
        }}
      />
    </SlidingPane>
  )
}

export default CreateAnnotationSlider
