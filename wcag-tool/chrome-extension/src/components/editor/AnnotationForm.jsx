import React from 'react'
import { Formik, Field, Form, useField, useFormikContext } from 'formik'
import * as Yup from 'yup'
import ActionButton from '../common/ActionButton'
import RichTextEditor from './RichTextEditor'
import {
  useGetSuccessCriteriaQuery,
  useGetGuidelinesQuery,
  useGetPrinciplesQuery,
} from '../../services/apiService'

const SelectField = ({ field, form, ...props }) => {
  return (
    <div className="relative">
      <select {...field} {...props} />
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
    const successCriterium = successCriteria?.find((el) => el.successCriteriumId === id)
    return successCriterium ? `${successCriterium?.num} ${successCriterium?.handle} ` : 'Title'
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
            >
              <option key="default" hidden>
                Choose WCAG success criterium
              </option>

              {principles &&
                principles.map((principle) => (
                  <>
                    <option key={principle.principleId} className="font-black" disabled>
                      {principle.num} {principle.handle}
                    </option>
                    {guidelines &&
                      guidelines
                        // .filter((el) => el.num.substring(0, 1) === principle.num)
                        .map((guideline) => (
                          <optgroup
                            key={guideline.num + guideline.handle}
                            label={`${guideline.num} ${guideline.handle}`}
                          >
                            {successCriteria &&
                              successCriteria
                                .filter((el) => el.num.substring(0, 3) === guideline.num)
                                .map((successCriterium) => (
                                  <option
                                    key={successCriterium.num + successCriterium.handle}
                                    value={successCriterium.successCriteriumId}
                                  >
                                    {successCriterium.num} {successCriterium.handle}
                                  </option>
                                ))}
                          </optgroup>
                        ))}
                  </>
                ))}
            </Field>
          </label>
          {errors.successCriterium && touched.successCriterium && (
            <div className="text-red-700 -mt-2 mx-1">{errors.successCriterium}</div>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
            <TitleField
              type="text"
              name="title"
              placeholder={getSuccesCriteriumTitleFromId(values.successCriteriumId)}
              className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </label>
          {errors.title && touched.title && (
            <div className="text-red-700 -mt-2 mx-1">{errors.title}</div>
          )}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
            <Field component={RichTextEditor} name="description" placeholder="Description" />
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
        (el) => el.successCriteriumId === successCriteriumId
      )
      // eslint-disable-next-line react/destructuring-assignment
      setFieldValue(props.name, `${successCriterium?.num} ${successCriterium?.handle}`)
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
