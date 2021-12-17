import React, { useEffect } from 'react'
import OverlayButton from './OverlayButton'
import AnnotationListSlider from './AnnotationListSlider'
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'
import { useDispatch, useSelector } from 'react-redux'
import { setIsIdle } from '../../services/userSlice'

function resetTimer(timer, handleIdle, handleActive) {
  clearTimeout(timer)
  timer = setTimeout(handleIdle, 2000)
  handleActive()
  return timer
}

const activateIdleDetection = (handleIdle, handleActive) => {
  let timer

  const x = () => {
    timer = resetTimer(timer, handleIdle, handleActive)
  }

  window.onload = x
  window.onmousemove = x
  window.onmousedown = x
  window.ontouchstart = x
  window.onclick = x
  window.onkeydown = x
  window.onscroll = x
}

const deactivateIdleDetection = () => {
  window.onload = null
  window.onmousemove = null
  window.onmousedown = null
  window.ontouchstart = null
  window.onclick = null
  window.onkeydown = null
  window.onscroll = null
}

const App = () => {
  const dispatch = useDispatch()
  const isIdle = useSelector((state) => state.user.isIdle)

  const handleUserIsActive = () => {
    if (isIdle) {
      dispatch(setIsIdle(false))
    }
  }

  const handleUserIsIdle = () => {
    if (!isIdle) {
      dispatch(setIsIdle(true))
    }
  }

  useEffect(() => {
    activateIdleDetection(handleUserIsIdle, handleUserIsActive)
    return () => {
      deactivateIdleDetection()
    }
  }, [isIdle])

  return (
    <>
      <OverlayButton />
      <AnnotationListSlider />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider />
    </>
  )
}

export default App
