import React from 'react';
import { useDispatch } from 'react-redux';
import {
  setListSliderIsOpen,
  setSelectElement,
} from '../../../services/annotationSlice';
import DefaultButton from '../common/DefaultButton';

const NoAnnotation = function () {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center">
      <div className="p-1 text-black">
        <div className="flex p-4 flex-col items-center">
          <div className="folderIcon m-2" />
          <p className="text-xl m-2">
            <b>No annotations</b>
          </p>
          <p className="m-2">Create an annotation and mark problems</p>
          <DefaultButton
            onClick={() => {
              dispatch(setListSliderIsOpen(false));
              dispatch(setSelectElement(true));
            }}
          >
            Create annotation
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default NoAnnotation;
