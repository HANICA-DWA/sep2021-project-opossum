import React from 'react'
import SlidingPane from 'react-sliding-pane'
import './react-sliding-pane.css'

import IconButton from '../common/IconButton'
import { useAnalyse, useYAnnotations, useSliders } from '../../hooks'

import AnnotationList from './AnnotationList'
import NoAnnotation from './NoAnnotation'
import Awareness from './Awareness'

import { ButtonWithTooltip } from '../common/ButtonWithTooltip'
import { ButtonWithDropdown } from '../common/ButtonWithDropdown'
import { Icon } from '../common/Icon'

const AnnotationListSlider = ({ clients }) => {
  const { annotations } = useYAnnotations()
  const [{ openElementSelector, closeAllSliders }, { listSliderIsOpen }] = useSliders()
  const [analyse] = useAnalyse()

  return (
    <SlidingPane
      width="400px"
      className="remove-slide-plane-content-padding
                 font-poppins
                 text-gray-600"
      shouldCloseOnEsc
      from="left"
      onRequestClose={closeAllSliders}
      closeIcon={<IconButton title="Close Menu" className="arrowLeftIcon" />}
      isOpen={listSliderIsOpen}
      title={
        <>
          <div className="grid grid-flow-row">
            <span className="text-base font-medium text-gray-900 self-end truncate">
              Nu.nl Homepage text is way too long for the pane
            </span>
            <span className="mt-1 text-sm text-gray-500 self-start truncate">1 Jan 2021</span>
          </div>
          <div className="self-center flex flex-nowrap">
            <ButtonWithTooltip
              onClick={openElementSelector}
              toolTipText="Create Annotation"
              className="text-gray-700 border border-gray-500 p-2 hover:bg-gray-200 rounded-l-lg"
            >
              <Icon name="plus" />
            </ButtonWithTooltip>
            <ButtonWithDropdown
              className="text-gray-700 border border-gray-500 border-l-0 py-2 px-0.5 hover:bg-gray-200 rounded-r-lg"
              dropdownItems={[
                {
                  onClick: analyse,
                  name: 'Auto analysis',
                  icon: <Icon name="chart-pie" />,
                },
              ]}
            />
          </div>
        </>
      }
    >
      <div className="flex flex-col h-full justify-between">
        <div className="overflow-y-auto">
          {!annotations || annotations.length === 0 ? (
            <NoAnnotation openElementSelector={openElementSelector} />
          ) : (
            <AnnotationList annotations={annotations} />
          )}
        </div>
        <div>
          <hr />
          <Awareness clients={clients} />
        </div>
      </div>
    </SlidingPane>
  )
}

export default AnnotationListSlider
