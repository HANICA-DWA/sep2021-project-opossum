import React from 'react';
import Annotation from './Annotation';

const AnnotationList = function ({ annotations }) {
  return annotations.map(({ title, description, selector }) => (
    <Annotation
      key={title}
      title={title}
      description={description}
      selector={selector}
    />
  ));
};

export default AnnotationList;
