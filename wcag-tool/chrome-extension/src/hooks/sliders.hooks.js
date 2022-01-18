import { useDispatch, useSelector } from 'react-redux'
import {
  setHighlightedElementSelector,
  setNewAnnotationSelector,
  setSelectedAnnotationId,
} from '../services/annotationSlice'
import {
  setCreateAndEditSliderIsOpen,
  setDetailSliderIsOpen,
  setListSliderIsOpen,
  setElementSelectorIsOpen,
} from '../services/slidersSlice'

// Slider Logic
export const useSliders = () => {
  const dispatch = useDispatch()
  const {
    listSliderIsOpen,
    createAndEditSliderIsOpen,
    detailsSliderIsOpen,
    elementSelectorIsOpen,
  } = useSelector((state) => state.sliders)

  const anySliderOpen = listSliderIsOpen || createAndEditSliderIsOpen || detailsSliderIsOpen

  const openCreateAndEditSlider = (selector) => {
    dispatch(setCreateAndEditSliderIsOpen(true))
    dispatch(setDetailSliderIsOpen(false))
    dispatch(setListSliderIsOpen(false))
    dispatch(setElementSelectorIsOpen(false))

    if (selector) {
      dispatch(setNewAnnotationSelector(selector))
    }
  }

  const openDetailsSlider = (selectedAnnotationId, index) => {
    dispatch(setSelectedAnnotationId({ id: selectedAnnotationId, index }))
    dispatch(setHighlightedElementSelector(''))

    dispatch(setDetailSliderIsOpen(true))
    dispatch(setListSliderIsOpen(false))
    dispatch(setCreateAndEditSliderIsOpen(false))
    dispatch(setElementSelectorIsOpen(false))
  }

  const openListSlider = () => {
    dispatch(setSelectedAnnotationId({ id: '' }))
    dispatch(setHighlightedElementSelector(''))

    dispatch(setListSliderIsOpen(true))
    dispatch(setDetailSliderIsOpen(false))
    dispatch(setCreateAndEditSliderIsOpen(false))
    dispatch(setElementSelectorIsOpen(false))
  }

  const closeAllSliders = () => {
    dispatch(setCreateAndEditSliderIsOpen(false))
    dispatch(setDetailSliderIsOpen(false))
    dispatch(setListSliderIsOpen(false))
    dispatch(setElementSelectorIsOpen(false))
  }

  const openElementSelector = () => {
    dispatch(setSelectedAnnotationId({ id: '', index: 0 }))

    dispatch(setElementSelectorIsOpen(true))
    dispatch(setCreateAndEditSliderIsOpen(false))
    dispatch(setDetailSliderIsOpen(false))
    dispatch(setListSliderIsOpen(false))
  }

  return [
    {
      closeAllSliders,
      openListSlider,
      openDetailsSlider,
      openCreateAndEditSlider,
      openElementSelector,
    },
    {
      anySliderOpen,
      listSliderIsOpen,
      createAndEditSliderIsOpen,
      detailsSliderIsOpen,
      elementSelectorIsOpen,
    },
  ]
}
