import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { setSnapshotCreationNotAllowed } from '../services/popupSlice'

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

      dispatch(
        setSnapshotCreationNotAllowed(
          isSnapshotCreationInProgress || isOpenOnEditorPage || isOpenOnChromePage
        )
      )
      if (isSnapshotCreationInProgress) {
        toast.info('Snapshot creation in progress, please wait...')
      }
      if (isOpenOnEditorPage || isOpenOnChromePage) {
        toast.info('Creating a snapshot is not allowed on this page')
      }
    })()
  }, [])
}
