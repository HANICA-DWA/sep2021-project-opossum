import React, { useEffect } from 'react'
import { Formik, Field, Form, useField, useFormikContext } from 'formik'
import * as Yup from 'yup'
import ActionButton from '../common/ActionButton'
import {
  useGetSuccessCriteriaQuery,
  useGetGuidelinesQuery,
  useGetPrinciplesQuery,
} from '../../services/apiService'
import { useSliders } from '../../hooks'

function AnnotationForm({ selectedAnnotation, handleCreate, handleUpdate }) {
  const { data: principles } = useGetPrinciplesQuery()
  const { data: guidelines } = useGetGuidelinesQuery()
  const { data: successCriteria } = useGetSuccessCriteriaQuery()

  const [{ openListSlider }] = useSliders()

  const initialValues = {
    successCriteriumId: selectedAnnotation?.successCriterium?.successCriteriumId || '',
    title: selectedAnnotation?.title || '',
    description: selectedAnnotation?.description || '',
  }

  console.log('TEST')
  console.log(initialValues.successCriteriumId)

  const validationSchema = Yup.object().shape({
    successCriteriumId: Yup.string(),
    title: Yup.string().max(60, 'Too Long! Max 60 characters.').required('Required'),
    description: Yup.string().max(1000, 'Too Long! Max 1000 characters.').required('Required'),
  })

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
      {({ errors, touched, dirty, isValid }) => (
        <Form>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            WCAG
            <Field
              as="select"
              name="successCriteriumId"
              defaultValue="WCAG2:extended-audio-description-prerecorded"
              className="mt-1 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option key="default" selected>
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

          {!selectedAnnotation ? (
            <div className="grid justify-end mt-8">
              <ActionButton disabled={!(dirty && isValid)} type="submit">
                Create Annotation
              </ActionButton>
            </div>
          ) : (
            <div className="grid grid-flow-col justify-end mt-8 gap-x-5">
              <ActionButton onClick={openListSlider} type="cancel">
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
    touched,
    setFieldValue,
  } = useFormikContext()
  const [field] = useField(props)

  useEffect(() => {
    // set the value of title, based on successCriteriumId
    if (successCriteriumId && touched.successCriteriumId && !touched.title) {
      const successCriterium = successCriteria.find(
        (el) => el.successCriteriumId === successCriteriumId
      )
      // eslint-disable-next-line react/destructuring-assignment
      setFieldValue(props.name, `${successCriterium?.num} ${successCriterium?.handle}`)
    }
    // eslint-disable-next-line react/destructuring-assignment, react-hooks/exhaustive-deps
  }, [successCriteriumId, touched.successCriteriumId, touched.title, setFieldValue, props.name])

  return <Field {...props} {...field} />
}

// eslint-disable-next-line import/prefer-default-export
export { AnnotationForm }
