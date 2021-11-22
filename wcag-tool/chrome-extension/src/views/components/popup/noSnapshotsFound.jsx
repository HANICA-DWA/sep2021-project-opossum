import React from 'react'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line import/named
import { createSnapshot } from '../../../services/snapshot/snapshotSlice'

const NoSnapshotsFound = function () {
  const dispatch = useDispatch()

  return (
    <div className="p-1 text-black">
      <div className="flex p-4 flex-col items-center">
        <div className="folderIcon m-2" />
        <p className="text-xl m-2">
          <b>No snapshots</b>
        </p>
        <p className="m-2">Create a snapshot and start analysis</p>
        <button
          type="button"
          className="p-0.5 px-4 m-2 mb-4 shadow border rounded-full bg-gray-50 border-gray-400 hover:bg-gray-200"
          onClick={() => {
            dispatch(createSnapshot())
          }}
        >
          Create Snapshot
        </button>
      </div>
    </div>
  )
}

export { NoSnapshotsFound }
