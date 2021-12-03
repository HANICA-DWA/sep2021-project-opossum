import React, { useEffect } from 'react'
import { Formik, Field, Form, useField, useFormikContext } from 'formik'
import * as Yup from 'yup'
import {
  useGetSuccessCriteriaQuery,
  useGetGuidelinesQuery,
  useGetPrinciplesQuery,
} from '../../services/apiService'

function AnnotationForm({ selectedAnnotation, handleCreate, handleUpdate }) {
  const { data: principles } = useGetPrinciplesQuery()
  const { data: guidelines } = useGetGuidelinesQuery()
  const { data: successCriteria } = useGetSuccessCriteriaQuery()

  const initialValues = {
    successCriteriumId: selectedAnnotation?.successCriterium.successCriteriumId || '',
    title: selectedAnnotation?.title || '',
    description: selectedAnnotation?.description || '',
  }

  const validationSchema = Yup.object().shape({
    successCriteriumId: Yup.string(),
    title: Yup.string().min(2, 'Too Short!').max(60, 'Too Long!').required('Required'),
    description: Yup.string().min(5, 'Too Short!').max(255, 'Too Long!').required('Required'),
  })

  const handleSubmit = async (successCriteriumId, title, description) => {
    if (selectedAnnotation) {
      handleUpdate(selectedAnnotation._id, { successCriteriumId, title, description })
    } else {
      handleCreate(successCriteriumId, title, description)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ successCriteriumId, title, description }) =>
        handleSubmit(successCriteriumId, title, description)
      }
    >
      {({ errors, touched, dirty, isValid }) => (
        <Form>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            WCAG
            <Field
              as="select"
              name="successCriteriumId"
              className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option key="default">Choose WCAG success criterium</option>

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
              placeholder="Title"
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

          <button
            type="submit"
            className="py-1 px-5 text-lg rounded-lg focus:border-4 border-green-400 bg-green-700 text-gray-100 hover:bg-green-900"
            disabled={!(dirty && isValid)}
          >
            {selectedAnnotation ? 'Save' : 'Create Annotation'}
          </button>
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
    touched,
    setFieldValue,
  } = useFormikContext()
  const [field] = useField(props)

  useEffect(() => {
    // set the value of title, based on successCriteriumId
    if (successCriteriumId !== undefined && touched.successCriteriumId && !touched.title) {
      const successCriterium = successCriteria.find(
        (el) => el.successCriteriumId === successCriteriumId
      )
      // eslint-disable-next-line react/destructuring-assignment
      setFieldValue(props.name, successCriterium.handle)
    }
    // eslint-disable-next-line react/destructuring-assignment, react-hooks/exhaustive-deps
  }, [successCriteriumId, touched.successCriteriumId, touched.title, setFieldValue, props.name])

  return <Field {...props} {...field} />
}

// eslint-disable-next-line import/prefer-default-export
export { AnnotationForm }
