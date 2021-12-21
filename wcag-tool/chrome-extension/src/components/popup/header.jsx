import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { onClickCreateSnapshot } from '../../hooks/popup.hooks'

const Header = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const snapshotNotAllowed = useSelector((state) => state.popup.snapshotNotAllowed)

  return (
    <div className="flex p-2 px-4 justify-between items-center border rounded-t-lg bg-gray-100 border-gray-300 cursor-default">
      <p>Name</p>
      <p>Site</p>
      <DefaultButton
        loading={loading}
        disabled={snapshotNotAllowed}
        onClick={onClickCreateSnapshot(setLoading, dispatch)}
      >
        Create
      </DefaultButton>
    </div>
  )
}

export default Header
