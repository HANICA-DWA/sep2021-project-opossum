import React from 'react';
import OverlayButton from './OverlayButton';
import AnnotationSlider from './AnnotationSlider';
import CreateAnnotationSlider from './CreateAnnotationSlider';
import AnnotationDetailSlider from './AnnotationDetailSlider';
import EditAnnotationSlider from './EditAnnotationSlider';
import IFrameWrapper from './IFrameWrapper';

const App = () => {
  return (
    <>
      <OverlayButton />
      <AnnotationSlider />
      <CreateAnnotationSlider />
      <AnnotationDetailSlider />
      <EditAnnotationSlider />
      <IFrameWrapper />
    </>
  );
};

export default App;
