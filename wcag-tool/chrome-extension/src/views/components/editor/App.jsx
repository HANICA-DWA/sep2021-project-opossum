import React from 'react'
import {
  OverlayButton,
  AnnotationSlider,
  CreateAnnotationSlider,
  IFrameWrapper,
} from './index'
import { AnnotationDetailSlider } from './AnnotationDetailSlider'
import { EditAnnotationSlider } from './EditAnnotationSlider'

const App = () => (
  <>
    <OverlayButton />
    <AnnotationSlider />
    <CreateAnnotationSlider />
    <AnnotationDetailSlider />
    <EditAnnotationSlider />
    <IFrameWrapper />
  </>
)

export { App }
