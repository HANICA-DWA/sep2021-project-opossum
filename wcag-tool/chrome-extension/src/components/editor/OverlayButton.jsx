import React from 'react'
import { useSliders } from '../../hooks'
import FloatButton from '../common/FloatButton'
import { useTranslation } from 'react-i18next'

const OverlayButton = function () {
  const { t } = useTranslation()
  const [
    { openListSlider },
    { listSliderIsOpen, createAndEditSliderIsOpen, detailsSliderIsOpen, elementSelectorIsOpen },
  ] = useSliders()

  const isSliderOpen =
    elementSelectorIsOpen || listSliderIsOpen || createAndEditSliderIsOpen || detailsSliderIsOpen

  return (
    <div className="absolute top-4 left-4 flex align-middle justify-center">
      <FloatButton
        tooltipText={t('OPEN_MENU')}
        toolTipPosition="bottom-start"
        onClick={openListSlider}
        hidden={isSliderOpen}
      >
        {/* Open annotation list slider */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </FloatButton>
      <FloatButton
        tooltipText="Exit Selection Mode"
        toolTipPosition="bottom-start"
        onClick={openListSlider}
        hidden={!elementSelectorIsOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </FloatButton>
    </div>
  )
}

export default OverlayButton
