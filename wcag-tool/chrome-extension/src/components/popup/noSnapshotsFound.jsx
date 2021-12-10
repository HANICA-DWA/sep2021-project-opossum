import React from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { setCreateSnapshotBodyIsLoading } from '../../services/popupSlice'

const NoSnapshotsFound = () => {
  const dispatch = useDispatch()
  const loadingHeader = useSelector((state) => state.popup.createSnapshotHeaderIsLoading)
  const loading = useSelector((state) => state.popup.createSnapshotBodyIsLoading)
  const snapshotCreationNotAllowed = useSelector((state) => state.popup.snapshotCreationNotAllowed)

  return (
    <div className="p-1 text-black">
      <div className="flex p-4 flex-col items-center">
        <div className="folderIcon m-2" />
        <p className="text-xl m-2 font-poppins-semi">No snapshots</p>
        <p className="m-2">Create a snapshot and start analysis</p>
        <DefaultButton
          disabled={loadingHeader || snapshotCreationNotAllowed}
          loading={loading}
          onClick={async () => {
            dispatch(setCreateSnapshotBodyIsLoading(true))
            const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
            browser.runtime.sendMessage({ method: 'tabs.snapshot', tab }).then((response) => {
              if (response.method === 'popup.noAccess') {
                toast.error('Unable to create a snapshot on this page')
              }
              dispatch(setCreateSnapshotBodyIsLoading(false))
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
