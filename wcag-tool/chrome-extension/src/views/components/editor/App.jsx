import React from 'react';
import OverlayButton from './OverlayButton';
import AnnotationListSlider from './AnnotationListSlider';
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider';
import AnnotationDetailSlider from './AnnotationDetailSlider';
import IFrameWrapper from './IFrameWrapper';

const App = () => {
  return (
    <>
      <OverlayButton />
      <AnnotationListSlider />
      <CreateAndEditAnnotationSlider newAnnotation />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider />
      <IFrameWrapper />
    </>
  );
};

export default App;
