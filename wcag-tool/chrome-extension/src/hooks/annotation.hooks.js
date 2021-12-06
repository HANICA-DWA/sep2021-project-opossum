import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

import { useSliders } from './sliders.hooks'
import {
  useCreateAnnotationMutation,
  useGetAnnotationsQuery,
  useUpdateAnnotationMutation,
} from '../services/apiService'
import { setNewAnnotationSelector } from '../services/annotationSlice'

const dummySnapshotId = '61ae2c0c729e718c04cc26ff'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:5000', 'room', ydoc)
const sharedAnnotations = ydoc.getArray(`${dummySnapshotId}-annotations`) // shared Yjs state

export const useAnnotation = () => {
  const [localAnnotations, setLocalAnnotations] = useState([]) // local React state
  const { data: remoteAnnotations, refetch } = useGetAnnotationsQuery(dummySnapshotId) // remote MongoDB state
  const { selectedAnnotationId } = useSelector((state) => state.annotation)

  const selectedAnnotation = localAnnotations?.find(
    (annotation) => annotation._id === selectedAnnotationId
  )

  // Setup synchronisation between shared and local state
  useEffect(() => {
    // Initial sync
    if (provider.synced) {
      refetch()
    } else {
      provider.once('synced', refetch)
    }

    sharedAnnotations.observe(() => {
      console.log('shared array changed!')
      setLocalAnnotations(sharedAnnotations.toArray())
    })

    return () => {
      sharedAnnotations.unobserve(() => {
        console.log('shared array unobserved!')
      })
    }
  }, [])

  // Sync remote, shared and local states when new data is fetched
  useEffect(() => {
    if (!remoteAnnotations || remoteAnnotations.length === 0) return

    // 2. Calculate difference between local and remote state
    const difference = [...sharedAnnotations.toArray(), ...remoteAnnotations].filter(
      (el) => !sharedAnnotations.toArray().some((_el) => _el._id === el._id)
    )

    // 3. Insert differences into shared state
    if (difference.length > 0) sharedAnnotations.insert(0, difference)

    // 4. Update local state
    setLocalAnnotations(sharedAnnotations.toArray())

    // DEBUG
    console.log('rerender useAnnotations!')
    console.log('local', localAnnotations.slice(0, 5))
    console.log('remote', remoteAnnotations)
    console.log('shared', sharedAnnotations.toArray().slice(0, 5))
  }, [remoteAnnotations])

  return { annotations: localAnnotations, selectedAnnotation, selectedAnnotationId }
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
    // Filter unchanged fields
    console.log(_id, fields)

    _updateAnnotation({
      snapshotId: dummySnapshotId, // TODO: Replace snapshotId!
      annotationId: _id,
      newFields: fields,
    })
      .unwrap()
      .then((updatedAnnotation) => {
        openDetailsSlider(updatedAnnotation._id)
        // TODO: Add yjs logic!
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e))
  }

  return [updateAnnotation, { error }]
}
