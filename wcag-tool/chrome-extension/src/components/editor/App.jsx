import React from 'react'
import OverlayButton from './OverlayButton'
import AnnotationListSlider from './AnnotationListSlider'
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'
import { useAwareness } from '../../hooks/awareness.hook'
import { useGetSnapshotId, useYAnnotations } from '../../hooks'
import BadgeList from './BadgeList'

const App = () => {
  const snapshotId = useGetSnapshotId()
  const { clients } = useAwareness(snapshotId)
  const { annotations } = useYAnnotations()

  return (
    <>
      {annotations && annotations.length > 0 && <BageList annotations={annotations} />}
      <OverlayButton />
      <AnnotationListSlider annotations={annotations} clients={clients} />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider />
    </>
  )
}

export default App
