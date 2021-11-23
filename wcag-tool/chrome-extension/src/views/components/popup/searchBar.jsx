import React from 'react'
import { filterhook } from '../../../services/snapshot/hooks'
import Button from '../common/Button'

const SearchBar = function () {
  const filter = filterhook()

  return (
    <div className="m-1.5">
      <div className="flex items-center p-1 border rounded-md border-gray-300 bg-gray-100">
        <Button action={filter} classNames="searchIcon mx-2 mr-2" />
        <input
          type="text"
          className="p-2 flex-1 bg-gray-100 text-gray-300"
          placeholder="Search to refine results.."
        />
      </div>
    </div>
  )
}

export default SearchBar
