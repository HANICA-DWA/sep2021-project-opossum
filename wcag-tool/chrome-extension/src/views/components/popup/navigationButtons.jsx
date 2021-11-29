import React from 'react'
import Button from '../common/Button'

const NavigationButtons = function () {
  const disabledStyle = 'disabled:bg-gray-400 cursor-not-allowed text-white'

  return (
    <>
      <hr />
      <div className="flex p-2 flex-col items-center">
        <p>Showing 0 Entries</p>
        <div className="flex p-2 text-xl">
          <Button
            name="Prev"
            isDisabled={true}
            disabledStyle={disabledStyle}
            classNames={`p-2 rounded-l bg-gray-300 text-black hover:bg-gray-400`}
          />
          <Button
            name="Next"
            isDisabled={true}
            disabledStyle={disabledStyle}
            classNames={`p-2 rounded-r bg-gray-300 text-black hover:bg-gray-400`}
          />
        </div>
      </div>
    </>
  )
}

export default NavigationButtons
