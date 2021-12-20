import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { setCreateSnapshotHeaderIsLoading } from '../../services/popupSlice'

const Header = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.popup.createSnapshotHeaderButtonIsLoading)
  const loadingBody = useSelector((state) => state.popup.createSnapshotBodyButtonIsLoading)
  const snapshotCreationNotAllowed = useSelector((state) => state.popup.snapshotCreationNotAllowed)

  return (
    <div className="flex p-2 px-4 justify-between items-center border rounded-t-lg bg-gray-100 border-gray-300 cursor-default">
      <p>Name</p>
      <p>Site</p>
      <DefaultButton
        loading={loading}
        disabled={loadingBody || snapshotCreationNotAllowed}
        onClick={async () => {
          dispatch(setCreateSnapshotHeaderIsLoading(true))
          const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
          browser.runtime.sendMessage({ method: 'tabs.snapshot', tab }).then(() => {
            dispatch(setCreateSnapshotHeaderIsLoading(false))
          })
        }}
      >
        Create
      </DefaultButton>
    </div>
  )
}

export default Header
