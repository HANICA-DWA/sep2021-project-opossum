import React from 'react'
import { useCreateSnapshot } from '../../../services/snapshot/hooks'
import Button from '../common/Button'

const Header = function () {
  const createSnapshot = useCreateSnapshot()

  return (
    <div className="flex mt-1 p-2 px-4 justify-between items-center border rounded-t-lg bg-gray-100 border-gray-300">
      <p>Name</p>
      <p>Site</p>
      <Button
        name="Create"
        onClick={() => createSnapshot()}
        classNames="border border-gray-400 rounded-full bg-gray-50 hover:bg-gray-200"
      />
    </div>
  )
}

export default Header
