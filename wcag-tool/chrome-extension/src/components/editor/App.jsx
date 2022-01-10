import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OverlayButton from './OverlayButton'
import AnnotationListSlider from './AnnotationListSlider'
import CreateAndEditAnnotationSlider from './CreateAndEditAnnotationSlider'
import AnnotationDetailSlider from './AnnotationDetailSlider'
import { setIsIdle } from '../../services/userSlice'
import { useAwareness } from '../../hooks/awareness.hook'
import { useGetSnapshotId } from '../../hooks/editor.hooks'
import { useSliders, useOptions } from '../../hooks'

function resetTimer(timer, handleIdle, handleActive) {
  clearTimeout(timer)
  timer = setTimeout(handleIdle, 30000)
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
  const snapshotId = useGetSnapshotId()
  const { clients } = useAwareness(snapshotId)
  const options = useOptions()

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

  // eslint-disable-next-line no-empty-pattern
  const [{}, { anySliderOpen }] = useSliders()

  useEffect(() => {
    async function manageSlider() {
      const iframeDocument = window.document.getElementById('editor').contentWindow.document
      if (!iframeDocument) return

      iframeDocument.body.style.transition = 'transform 0.5s ease-in-out'
      if (anySliderOpen) {
        if (options.sideBySide) {
          iframeDocument.body.style.transform = 'translateX(400px)'
        }
      } else {
        iframeDocument.body.style.transform = 'translateX(0px)'
      }
    }

    manageSlider()
  }, [anySliderOpen])

  return (
    <>
      <OverlayButton />
      <AnnotationListSlider clients={clients} />
      <AnnotationDetailSlider />
      <CreateAndEditAnnotationSlider />
    </>
  )
}

export default App
