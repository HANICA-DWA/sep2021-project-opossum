import React from 'react'
import { useSelector } from 'react-redux'
import { CloseSelectElementButton } from './CloseSelectElementButton'
import { selectSelectElement } from '../services/annotationSlice'
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
