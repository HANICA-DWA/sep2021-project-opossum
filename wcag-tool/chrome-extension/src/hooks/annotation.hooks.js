import { useDispatch, useSelector } from 'react-redux'
import { useSliders } from './sliders.hooks'
import {
  useCreateAnnotationMutation,
  useGetAnnotationsQuery,
  useUpdateAnnotationMutation,
} from '../services/apiService'
import { setNewAnnotationSelector } from '../services/annotationSlice'

export const useAnnotation = () => {
  const { data: annotations } = useGetAnnotationsQuery('61a9f47fe84cdb57824daed3')
  const { selectedAnnotationId } = useSelector((state) => state.annotation)

  const selectedAnnotation = annotations?.find(
    (annotation) => annotation._id === selectedAnnotationId
  )

  return { annotations, selectedAnnotationId, selectedAnnotation }
}

export const useCreateAnnotation = () => {
  const dispatch = useDispatch()
  const { newAnnotationSelector: selector } = useSelector((state) => state.annotation) // Selector is obtained and set in IFrameWrapper
  const [_createAnnotation, { error }] = useCreateAnnotationMutation()
  const [{ openDetailsSlider }] = useSliders()

  const createAnnotation = (successCriteriumId, title, description) => {
    _createAnnotation({
      snapshotId: '61a9f47fe84cdb57824daed3', // TODO: Replace snapshotId!
      newAnnotation: { successCriteriumId, title, description, selector },
    })
      .unwrap()
      .then((createdAnnotation) => {
        dispatch(setNewAnnotationSelector('')) // unset new annotation css selector

        openDetailsSlider(createdAnnotation._id)
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  }

  return [createAnnotation, { error }]
}

export const useUpdateAnnotation = () => {
  const [_updateAnnotation, { error }] = useUpdateAnnotationMutation()
  const [{ openDetailsSlider }] = useSliders()

  // TODO: Logic to set new selector for selectedAnnotation

  const updateAnnotation = (_id, fields) => {
    _updateAnnotation({
      snapshotId: '61a9f47fe84cdb57824daed3', // TODO: Replace snapshotId!
      annotationId: _id,
      newFields: fields,
    })
      .unwrap()
      .then((updatedAnnotation) => {
        openDetailsSlider(updatedAnnotation._id)
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  }

  return [updateAnnotation, { error }]
}
