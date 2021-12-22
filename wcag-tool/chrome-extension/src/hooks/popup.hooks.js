import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { setCreateSnapshotNotAllowed, setSnapshotNotAllowed } from '../services/popupSlice'

export const useRegisterPopupEffects = () => {
  const dispatch = useDispatch()

  const getCurrentActiveTab = async () => {
    const [activeTab] = await browser.tabs.query({ currentWindow: true, active: true })
    return activeTab
  }

  const getIsSnapshotCreationInProgress = async () => {
    const taskList = await browser.runtime.sendMessage({
      method: 'downloads.getInfo',
    })
    return taskList.length > 0
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

      let errorMessage
      if (isSnapshotCreationInProgress) {
        errorMessage = 'Snapshot creation in progress, please wait...'
        dispatch(setSnapshotNotAllowed(isSnapshotCreationInProgress))
        toast.info(errorMessage)
      } else if (isOpenOnEditorPage || isOpenOnChromePage) {
        errorMessage = 'Creating a snapshot is not allowed on this page'
        dispatch(
          setCreateSnapshotNotAllowed({
            status: isOpenOnEditorPage || isOpenOnChromePage,
            errorMessage,
          })
        )
      }
    })()
  }, [])
}

export const onClickCreateSnapshot = (setLoading, dispatch) => async () => {
  setLoading(true);
  dispatch(setSnapshotNotAllowed(true));
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  browser.runtime.sendMessage({ method: "tabs.createSnapshot", tab }).then(() => {
    setLoading(false);
    dispatch(setSnapshotNotAllowed(false));
  });
};
