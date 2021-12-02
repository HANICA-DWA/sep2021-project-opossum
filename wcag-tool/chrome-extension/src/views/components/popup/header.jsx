import React from 'react'
import DefaultButton from '../common/DefaultButton'

const Header = function () {
  return (
    <div className="flex mt-0.5 p-2 px-4 justify-between items-center border rounded-t-lg bg-gray-100 border-gray-300">
      <p>Name</p>
      <p>Site</p>
      <DefaultButton
        onClick={() => {
          chrome.tabs.create({ url: './snapshot.html' })
        }}
        classNames="border border-gray-400 rounded-full bg-gray-50 hover:bg-gray-200"
      >
        Create
      </DefaultButton>
    </div>
  )
}

export default Header
