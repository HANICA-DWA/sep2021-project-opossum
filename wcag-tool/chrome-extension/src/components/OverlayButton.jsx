import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CloseSelectElementButton } from './CloseSelectElementButton'
import {
  selectSelectElement,
  setListSliderIsOpen,
} from '../services/annotationSlice'
import { OpenListSliderButton } from './OpenListSliderButton'

const OverlayButton = function () {
  const selectElement = useSelector(selectSelectElement)

  return !selectElement ? (
    <OpenListSliderButton />
  ) : (
    <CloseSelectElementButton />
  )
}

export { OverlayButton }
