import React from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { setLoaderPopupHeader } from '../../services/loadingSlice'
import { useGetSnapshotCreationProgress } from '../../hooks/popup.hooks'

const Header = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading.popupHeaderCreateSnapshot)
  const loadingBody = useSelector((state) => state.loading.popupBodyCreateSnapshot)
  const snapshotCreationInProgress = useGetSnapshotCreationProgress()

  return (
    <div className="flex mt-0.5 p-2 px-4 justify-between items-center border rounded-t-lg bg-gray-100 border-gray-300">
      <p>Name</p>
      <p>Site</p>
      <DefaultButton
        loading={loading}
        disabled={loadingBody || snapshotCreationInProgress}
        onClick={async () => {
          dispatch(setLoaderPopupHeader(true))
          const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
          browser.runtime.sendMessage({ method: 'tabs.snapshot', tab }).then((response) => {
            if (response.method === 'popup.noAccess') {
              toast.error('Unable to create a snapshot on this page')
            }
            dispatch(setLoaderPopupHeader(false))
          })
        }}
      >
        Create
      </DefaultButton>
    </div>
  )
}

export default Header
