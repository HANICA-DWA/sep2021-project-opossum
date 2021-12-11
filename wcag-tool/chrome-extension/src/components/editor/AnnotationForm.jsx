import React from 'react'
import { Formik, Field, Form, useField, useFormikContext } from 'formik'
import * as Yup from 'yup'
import ActionButton from '../common/ActionButton'
import {
  useGetSuccessCriteriaQuery,
  useGetGuidelinesQuery,
  useGetPrinciplesQuery,
} from '../../services/apiService'

const SelectField = ({ field, form, ...props }) => {
  return (
    <div className="relative">
      <input placeholder="WCAG" list="WCAG" {...field} {...props} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 absolute right-3 top-2.5 text-gray-600 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}
function AnnotationForm({ selectedAnnotation, handleCreate, handleUpdate, closeEditor }) {
  const { data: principles } = useGetPrinciplesQuery()
  const { data: guidelines } = useGetGuidelinesQuery()
  const { data: successCriteria } = useGetSuccessCriteriaQuery()

  const initialValues = {
    successCriteriumId: selectedAnnotation?.successCriterium?.successCriteriumId || '',
    title: selectedAnnotation?.title || '',
    description: selectedAnnotation?.description || '',
  }

  const validationSchema = Yup.object().shape({
    successCriteriumId: Yup.string(),
    title: Yup.string().max(60, 'Too Long! Max 60 characters.').required('Required'),
    description: Yup.string().max(1000, 'Too Long! Max 1000 characters.').required('Required'),
  })

  const getSuccesCriteriumTitleFromId = (id) => {
    const successCriterium = successCriteria?.find((el) => el.num === id)
    return successCriterium ? `${successCriterium?.num} ${successCriterium?.handle} ` : 'Title'
  }

  const getSuccesCriteriumFromId = (id) => {
    const successCriterium = successCriteria?.find((el) => el.num === id)
    return successCriterium
  }

  const handleSubmit = async (successCriteriumId, title, description) => {
    const successCriterium = successCriteria?.find(
      (el) => el.successCriteriumId === successCriteriumId
    )

    if (selectedAnnotation) {
      handleUpdate(selectedAnnotation._id, { successCriterium, title, description })
    } else {
      handleCreate(successCriterium, title, description)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ successCriteriumId, title, description }) => {
        handleSubmit(successCriteriumId, title, description)
      }}
    >
      {({ values, errors, touched, dirty, isValid }) => (
        <Form>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            WCAG
            <Field
              component={SelectField}
              name="successCriteriumId"
              className="mt-1 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <svg
              onClick={() => {
                console.log(
                  getSuccesCriteriumFromId(
                    values.successCriteriumId.slice(0, values.successCriteriumId.indexOf(' '))
                  ).title
                )
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 absolute right-1 top-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>
                {
                  getSuccesCriteriumFromId(
                    values.successCriteriumId.slice(0, values.successCriteriumId.indexOf(' '))
                  )?.title
                }
              </title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <datalist id="WCAG">
              {successCriteria &&
                successCriteria
                  .slice() // copy array to avoid mutation
                  .sort((a, b) => (a.num > b.num ? 1 : -1))
                  .map((successCriterium) => (
                    <option
                      key={successCriterium.successCriteriumId}
                      value={`${successCriterium.num} ${successCriterium.handle}`}
                    >
                      {`${successCriterium.level}`}
                    </option>
                  ))}
            </datalist>
          </label>
          {errors.successCriterium && touched.successCriterium && (
            <div className="text-red-700 -mt-2 mx-1">{errors.successCriterium}</div>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
            <TitleField
              type="text"
              name="title"
              placeholder={getSuccesCriteriumTitleFromId(
                values.successCriteriumId.substring(0, values.successCriteriumId.indexOf(' '))
              )}
              className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          {errors.title && touched.title && (
            <div className="text-red-700 -mt-2 mx-1">{errors.title}</div>
          )}

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
          {errors.description && touched.description && (
            <div className="text-red-700 -mt-2 mx-1">{errors.description}</div>
          )}

          {!selectedAnnotation ? (
            <div className="grid justify-end mt-8">
              <ActionButton disabled={!(dirty && isValid)} type="submit">
                Create Annotation
              </ActionButton>
            </div>
          ) : (
            <div className="grid grid-flow-col justify-end mt-8 gap-x-5">
              <ActionButton onClick={closeEditor} type="button">
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
  )
}

// Depends on successCriterium field.
// source: https://formik.org/docs/examples/dependent-fields
const TitleField = (props) => {
  const { data: successCriteria } = useGetSuccessCriteriaQuery()
  const {
    values: { successCriteriumId },
    setFieldValue,
  } = useFormikContext()
  const [field] = useField(props)

  const copyWcagToTitle = () => {
    if (successCriteriumId) {
      const successCriterium = successCriteria?.find(
        (el) => el.num === successCriteriumId.substring(0, successCriteriumId.indexOf(' '))
      )
      // eslint-disable-next-line react/destructuring-assignment
      setFieldValue(props.name, `${successCriterium?.num || ''} ${successCriterium?.handle || ''}`)
    }
  }

  return (
    <div className="relative">
      <Field {...props} {...field} />
      <button title="Set WCAG as title" type="button" onClick={copyWcagToTitle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute right-3 top-2.5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  )
}

// eslint-disable-next-line import/prefer-default-export
export { AnnotationForm }
