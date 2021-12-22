import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { onClickCreateSnapshot } from '../../hooks/popup.hooks'

const Header = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const createSnapshotNotAllowed = useSelector((state) => state.popup.createSnapshotNotAllowed)
  const createSnapshotErrorMessage = useSelector((state) => state.popup.createSnapshotErrorMessage)

  return (
    <div className="flex p-2 px-4 justify-between items-center border rounded-t-lg bg-gray-100 border-gray-300 cursor-default">
      <p>Name</p>
      <p>Site</p>
      <DefaultButton
        title={createSnapshotErrorMessage}
        loading={loading}
        disabled={createSnapshotNotAllowed}
        onClick={onClickCreateSnapshot(setLoading, dispatch)}
      >
        Create
      </DefaultButton>
    </div>
  )
}

export default Header
