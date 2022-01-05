import React from 'react'
import SlidingPane from 'react-sliding-pane'
import './react-sliding-pane.css'

import IconButton from '../common/IconButton'
import { useAnalyse, useYAnnotations, useSliders } from '../../hooks'

import AnnotationList from './AnnotationList'
import NoAnnotation from './NoAnnotation'
import Awareness from './Awareness'
import { useGetSnapshotQuery } from '../../services'
import { formatCreatedAtString } from '../../utils'
import { useGetSnapshotId } from '../../hooks/editor.hooks'
import { ButtonWithTooltip } from '../common/ButtonWithTooltip'
import { ButtonWithDropdown } from '../common/ButtonWithDropdown'
import { Icon } from '../common/Icon'

const AnnotationListSlider = ({ clients }) => {
  const { annotations } = useYAnnotations()
  const [{ openElementSelector, closeAllSliders }, { listSliderIsOpen }] = useSliders()
  const snapshotId = useGetSnapshotId()
  const { data: snapshotInfo } = useGetSnapshotQuery(snapshotId)
  const [shortDate, longDate] = formatCreatedAtString(snapshotInfo?.createdAt)
  const [analyse, { error, loading }] = useAnalyse()

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
        <div className="grid grid-flow-col justify-between">
          <div className="grid grid-flow-row">
            <span
              className="text-base font-medium text-gray-900 self-end truncate"
              title={snapshotInfo?.name}
            >
              {snapshotInfo?.name}
            </span>
            <span className="mt-1 text-sm text-gray-500 self-start truncate" title={longDate}>
              {shortDate}
            </span>
          </div>
          <div className="self-center flex flex-nowrap">
            <ButtonWithTooltip
              onClick={openElementSelector}
              toolTipText="Create Annotation"
              className="text-gray-700 border border-gray-300 p-2 hover:bg-gray-200 rounded-l-lg"
            >
              {loading ? (
                <Icon
                  name="broken-circle"
                  type="outline"
                  className="animate-spin"
                  viewBox="0 0 100 100"
                  color="blue"
                />
              ) : (
                <Icon className="text-gray-600" name="plus" />
              )}
            </ButtonWithTooltip>
            <ButtonWithDropdown
              className="text-gray-600 border border-gray-300 border-l-0 py-2 px-0.5 hover:bg-gray-200 rounded-r-lg"
              dropdownItems={[
                {
                  onClick: analyse,
                  name: 'Auto analysis',
                  icon: <Icon color="text-gray-700" size={4} name="chart-pie" />,
                },
              ]}
            />
          </div>
        </div>
      }
    >
      <div className="flex flex-col h-full justify-between">
        {!error && (
          <div
            className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
            role="alert"
          >
            <p className="font-bold">Be Warned</p>
            <p>Something not ideal might be happening.</p>
          </div>
        )}

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
