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
      <div>
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
        <svg
          onClick={() => {
            if (chrome.runtime.openOptionsPage) {
              chrome.runtime.openOptionsPage()
            } else {
              window.open(chrome.runtime.getURL('options.html'))
            }
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 inline text-gray-600 hover:text-gray-700 ml-2 mb-1 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <title>Options</title>
        </svg>
      </div>
    </div>
  )
}

export default Header
