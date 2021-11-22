import React from 'react'

const SearchBar = function () {
  return (
    <div className="m-1.5">
      <div className="flex items-center p-1 border rounded-md bg-gray-100 border-gray-300">
        <button
          type="button"
          className="searchIcon mx-2 mr-2"
          onClick={() => {
            console.log('You clicked search button')
          }}
        />
        <input
          type="text"
          className="p-2 flex-1 bg-gray-100 text-gray-300"
          placeholder="Search to refine results.."
          name="search"
        />
      </div>
    </div>
  )
}

export { SearchBar }
