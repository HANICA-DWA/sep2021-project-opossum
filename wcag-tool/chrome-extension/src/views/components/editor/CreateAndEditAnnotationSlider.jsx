import React from 'react'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useDispatch, useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {
  addAnnotation,
  resetNewAnnotation,
  selectNewAnnotation,
  selectSelectedAnnotation,
  setCreateEditSliderIsOpen,
  setListSliderIsOpen,
  setSelectedAnnotation,
  updateAnnotation,
} from '../../../services/annotationSlice'
import ActionButton from '../common/ActionButton'

const CreateAndEditAnnotationSlider = ({ newAnnotation }) => {
  let sliderType
  if (newAnnotation) sliderType = 'create'
  else sliderType = 'edit'

  const dispatch = useDispatch()
  const isOpen = useSelector((state) => state.annotation[`${sliderType}SliderIsOpen`])
  const closeSlider = () => dispatch(setCreateEditSliderIsOpen({ type: sliderType, status: false }))

  const sliderProps = {
    create: {
      sliderTitle: 'Create Annotation',
      onSubmit:
        (annotation) =>
        ({ title, description }) => {
          closeSlider()
          dispatch(
            addAnnotation({
              title,
              description,
              selector: annotation.selector,
            })
          )
          dispatch(resetNewAnnotation())
          dispatch(setListSliderIsOpen(true))
        },
      buttons: (
        <div className="grid justify-end mt-8">
          <ActionButton type="submit">Create Annotation</ActionButton>
        </div>
      ),
      initialValues: () => ({
        title: '',
        description: '',
      }),
      annotationSelector: selectNewAnnotation,
    },
    edit: {
      sliderTitle: 'Edit Annotation',
      onSubmit:
        (annotation) =>
        ({ title, description }) => {
          closeSlider()
          dispatch(updateAnnotation({ title, description, oldTitle: annotation.oldTitle }))
          dispatch(setSelectedAnnotation({ ...annotation, title, description }))
        },
      initialValues: ({ title, description }) => ({
        title,
        description,
      }),
      buttons: (
        <div className="grid grid-flow-col justify-end mt-8 gap-x-5">
          <ActionButton onClick={() => closeSlider()} type="cancel">
            Cancel
          </ActionButton>
          <ActionButton type="submit">Save</ActionButton>
        </div>
      ),
      annotationSelector: selectSelectedAnnotation,
    },
  }

  const annotation = useSelector(sliderProps[sliderType].annotationSelector)

  return (
    <SlidingPane
      className="hide-default-close"
      closeIcon={<div />}
      isOpen={isOpen}
      title={
        <div className="grid grid-flow-col justify-between">
          <span className="text-gray-900 text-base font-poppins">
            {sliderProps[sliderType].sliderTitle}
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
        onSubmit={sliderProps[sliderType].onSubmit(annotation)}
        validationSchema={Yup.object().shape({
          title: Yup.string().min(2, 'Too Short!').max(60, 'Too Long!').required('Required'),
          description: Yup.string().min(5, 'Too Short!').max(255, 'Too Long!').required('Required'),
        })}
        initialValues={sliderProps[sliderType].initialValues(annotation)}
      >
        {({ errors, touched }) => (
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
            {sliderProps[sliderType].buttons}
          </Form>
        )}
      </Formik>
    </SlidingPane>
  )
}

export default CreateAndEditAnnotationSlider
