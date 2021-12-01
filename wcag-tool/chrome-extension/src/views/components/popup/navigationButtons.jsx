import React from 'react';
import NavigationButton from '../common/NavigationButton';

const NavigationButtons = function () {
  return (
    <>
      <hr />
      <div className="flex p-2 flex-col items-center">
        <p>Showing 0 Entries</p>
        <div className="flex p-2">
          <NavigationButton disabled className="rounded-l">
            Prev
          </NavigationButton>
          <NavigationButton disabled className="rounded-r">
            Next
          </NavigationButton>
        </div>
      </div>
    </>
  );
};

export default NavigationButtons;
