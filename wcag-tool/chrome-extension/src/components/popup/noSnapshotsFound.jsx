import React from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { setLoaderPopupBody } from '../../services/loadingSlice'

const NoSnapshotsFound = () => {
  const dispatch = useDispatch()
  const loadingHeader = useSelector((state) => state.loading.popupHeaderCreateSnapshot)
  const loading = useSelector((state) => state.loading.popupBodyCreateSnapshot)

  return (
    <div className="p-1 text-black">
      <div className="flex p-4 flex-col items-center">
        <div className="folderIcon m-2" />
        <p className="text-xl m-2 font-poppins-semi">No snapshots</p>
        <p className="m-2">Create a snapshot and start analysis</p>
        <DefaultButton
          disabled={loadingHeader}
          loading={loading}
          onClick={async () => {
            dispatch(setLoaderPopupBody(true))
            const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
            browser.runtime.sendMessage({ method: 'tabs.snapshot', tab }).then((response) => {
              if (response.method === 'popup.noAccess') {
                toast.error('Unable to create a snapshot on this page')
              }
              dispatch(setLoaderPopupBody(false))
            })
          }}
        >
          Create Snapshot
        </DefaultButton>
      </div>
    </div>
  )
}

export default NoSnapshotsFound
