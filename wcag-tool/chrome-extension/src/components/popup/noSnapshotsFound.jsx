import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { onClickCreateSnapshot } from '../../hooks/popup.hooks'

const NoSnapshotsFound = () => {
  const dispatch = useDispatch()
  const createSnapshotNotAllowed = useSelector((state) => state.popup.createSnapshotNotAllowed)
  const createSnapshotErrorMessage = useSelector((state) => state.popup.createSnapshotErrorMessage)
  const [loading, setLoading] = useState(false)

  return (
    <div className="p-1 text-black">
      <div className="flex p-4 flex-col items-center">
        <div className="folderIcon m-2" />
        <p className="text-xl m-2 font-poppins-semi">No snapshots</p>
        <p className="m-2">Create a snapshot and start analysis</p>
        <DefaultButton
          title={createSnapshotErrorMessage}
          disabled={createSnapshotNotAllowed}
          loading={loading}
          onClick={onClickCreateSnapshot(setLoading, dispatch)}
        >
          Create Snapshot
        </DefaultButton>
      </div>
    </div>
  )
}

export default NoSnapshotsFound
