import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCreateSnapshotNotAllowed } from '../services/popupSlice'

const snapshotCreationInProgressPleaseWait = 'Snapshot creation in progress, please wait...'
const createSnapshotMessage = 'Create snapshot'

const getIsSnapshotCreationInProgress = async () => {
  const taskList = await browser.runtime.sendMessage({
    method: 'downloads.getInfo',
  })
  return taskList.length > 0
}

export const useRegisterPopupEffects = () => {
  const dispatch = useDispatch()

  const getCurrentActiveTab = async () => {
    const [activeTab] = await browser.tabs.query({ currentWindow: true, active: true })
    return activeTab
  }

  const getIsOpenOnEditorPage = async () => {
    const tab = await getCurrentActiveTab()
    return browser.runtime.sendMessage({
      method: 'editor.isEditor',
      tab,
    })
  }

  const getIsOpenOnChromePage = async () => {
    const tab = await getCurrentActiveTab()
    try {
      await browser.scripting.insertCSS({
        css: '',
        target: { tabId: tab.id },
      })
      return false
    } catch (e) {
      return true
    }
  }

  useEffect(() => {
    ;(async () => {
      const isSnapshotCreationInProgress = await getIsSnapshotCreationInProgress()
      const isOpenOnEditorPage = await getIsOpenOnEditorPage()
      const isOpenOnChromePage = await getIsOpenOnChromePage()

      if (isSnapshotCreationInProgress) {
        dispatch(
          setCreateSnapshotNotAllowed({
            status: isSnapshotCreationInProgress,
            message: snapshotCreationInProgressPleaseWait,
          })
        )
        const intervalId = setInterval(async () => {
          const creationInProgress = await getIsSnapshotCreationInProgress()
          if (!creationInProgress) {
            dispatch(
              setCreateSnapshotNotAllowed({
                status: false,
                message: createSnapshotMessage,
              })
            )
            clearInterval(intervalId)
          }
        }, 500)
      } else if (isOpenOnEditorPage || isOpenOnChromePage) {
        dispatch(
          setCreateSnapshotNotAllowed({
            status: isOpenOnEditorPage || isOpenOnChromePage,
            message: 'Creating a snapshot is not allowed on this page',
          })
        )
      }
    })()
  }, [])
}

export const onClickCreateSnapshot = (setLoading, dispatch) => async () => {
  setLoading(true)
  dispatch(
    setCreateSnapshotNotAllowed({
      status: true,
      message: snapshotCreationInProgressPleaseWait,
    })
  )
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
  browser.runtime.sendMessage({ method: 'tabs.createSnapshot', tab })
  const intervalId = setInterval(async () => {
    const creationInProgress = await getIsSnapshotCreationInProgress()
    if (!creationInProgress) {
      dispatch(
        setCreateSnapshotNotAllowed({
          status: false,
          message: createSnapshotMessage,
        })
      )
      setLoading(false)
      clearInterval(intervalId)
    }
  }, 500)
}
