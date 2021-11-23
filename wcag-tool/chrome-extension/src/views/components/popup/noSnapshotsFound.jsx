import React from 'react'
import { createSnapshotHook } from '../../../services/snapshot/hooks'
import Button from '../common/Button'

const NoSnapshotsFound = function () {
  const createSnapshot = createSnapshotHook()

  return (
    <div className="p-1 text-black">
      <div className="flex p-4 flex-col items-center">
        <div className="folderIcon m-2" />
        <p className="text-xl m-2 font-poppins-semi">No snapshots</p>
        <p className="m-2">Create a snapshot and start analysis</p>
        <Button
          name="Create Snapshot"
          action={createSnapshot}
          classNames="m-2 mb-4 shadow border border-gray-400 rounded-full bg-gray-50 hover:bg-gray-200"
        />
      </div>
    </div>
  )
}

export default NoSnapshotsFound
