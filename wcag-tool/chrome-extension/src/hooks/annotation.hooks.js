import { useDispatch, useSelector } from 'react-redux'

import { useSliders } from './sliders.hooks'
import {
  useCreateAnnotationMutation,
  useDeleteAnnotationMutation,
  useGetAnnotationsQuery,
  useUpdateAnnotationMutation,
} from '../services/apiService'
import { setNewAnnotationSelector } from '../services/annotationSlice'

const dummySnapshotId = '61b7284ded4084fd77ced98a'

export const useAnnotation = () => {
  const { data: remoteAnnotations } = useGetAnnotationsQuery(dummySnapshotId)
  const { selectedAnnotationId } = useSelector((state) => state.annotation)

  const selectedAnnotation = remoteAnnotations?.find(
    (annotation) => annotation._id === selectedAnnotationId
  )

  return { selectedAnnotation, selectedAnnotationId }
}

export const useCreateAnnotation = () => {
  const dispatch = useDispatch()
  const { newAnnotationSelector: selector } = useSelector((state) => state.annotation) // Selector is obtained and set in IFrameWrapper
  const [_createAnnotation, { error }] = useCreateAnnotationMutation()
  const [{ openDetailsSlider }] = useSliders()

  const createAnnotation = (successCriterium, title, description) => {
    _createAnnotation({
      snapshotId: dummySnapshotId, // TODO: Replace snapshotId!
      newAnnotation: { successCriterium, title, description, selector },
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
    // TODO: filter & sanitize unchanged fields!

    _updateAnnotation({
      snapshotId: dummySnapshotId, // TODO: Replace snapshotId!
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

export const useDeleteAnnotation = () => {
  const [_deleteAnnotation, { error }] = useDeleteAnnotationMutation()
  const [{ openListSlider }] = useSliders()

  const deleteAnnotation = (_id) => {
    _deleteAnnotation({
      snapshotId: dummySnapshotId, // TODO: Replace snapshotId!
      annotationId: _id,
    })
      .unwrap()
      .then(() => {
        openListSlider()
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  }

  return [deleteAnnotation, { error }]
}
