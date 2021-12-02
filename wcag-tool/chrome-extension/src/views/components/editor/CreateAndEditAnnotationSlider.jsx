import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  addAnnotation,
  unsetNewAnnotationSelector,
  selectorNewAnnotation,
  setSelectedAnnotation,
  updateAnnotation,
} from '../../../services/annotationSlice'
import ActionButton from '../common/ActionButton'
import {
  selectorCreateSliderIsOpen,
  setCreateSliderIsOpen,
  setDetailSliderIsOpen,
  setListSliderIsOpen,
} from '../../../services/slidersSlice'

const CreateAndEditAnnotationSlider = ({ annotation }) => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectorCreateSliderIsOpen)
  const closeSlider = () => {
    dispatch(setCreateSliderIsOpen(false))
    dispatch(setListSliderIsOpen(true))
  }
  const selector = useSelector(selectorNewAnnotation)

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
      <Formik
        onSubmit={({ title, description }) => {
          closeSlider()
          if (annotation) {
            dispatch(updateAnnotation({ title, description, oldTitle: annotation.oldTitle }))
            dispatch(setSelectedAnnotation({ title, description, selector: annotation.selector }))
          } else {
              addAnnotation({
              snapshotId: '619e4d5c260d3ff4c06f85e4',
              newAnnotation: { title, description, selector },
            })
              .then(() => {
               dispatch(unsetNewAnnotationSelector())
            dispatch(setSelectedAnnotation({ title, description, selector }))
              .unwrap()
            dispatch(setDetailSliderIsOpen(true))
              })
              .catch((e) => console.log(e))
          }
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().max(60, 'Too Long! Max 60 characters.').required('Required'),
          description: Yup.string()
            .max(1000, 'Too Long! Max 1000 characters.')
            .required('Required'),
        })}
        initialValues={{
          title: annotation?.title || '',
          description: annotation?.description || '',
        }}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Title
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            {errors.title && touched.title ? (
              <div className="text-red-700 -mt-2 mx-1">{errors.title}</div>
            ) : null}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                rows="10"
                className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </label>
            {errors.description && touched.description ? (
              <div className="text-red-700 -mt-2 mx-1">{errors.description}</div>
            ) : null}
            {!annotation ? (
              <div className="grid justify-end mt-8">
                <ActionButton disabled={!(dirty && isValid)} type="submit">
                  Create Annotation
                </ActionButton>
              </div>
            ) : (
              <div className="grid grid-flow-col justify-end mt-8 gap-x-5">
                <ActionButton onClick={() => closeSlider()} type="cancel">
                  Cancel
                </ActionButton>
                <ActionButton disabled={!(dirty && isValid)} type="submit">
                  Save
                </ActionButton>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </SlidingPane>
  )
}

export default CreateAndEditAnnotationSlider

          