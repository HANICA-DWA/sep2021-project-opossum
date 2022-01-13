import React from 'react'
import SlidingPane from 'react-sliding-pane'
import './react-sliding-pane.css'

import { capitalizeFirstLetter, formatCreatedAtString } from "../../utils";
import { useAxeCore, useSliders, useGetSnapshotId } from '../../hooks'
import { useGetSnapshotQuery, useCreateAnnotationsMutation } from '../../services'

import Alert from './Alert'
import AnnotationList from './AnnotationList'
import Awareness from './Awareness'
import IconButton from '../common/IconButton'
import NoAnnotation from './NoAnnotation'
import { ButtonWithDropdown } from '../common/ButtonWithDropdown'
import { ButtonWithTooltip } from '../common/ButtonWithTooltip'
import { Icon } from '../common/Icon'

const AnnotationListSlider = ({ clients, annotations }) => {
  const [{ openElementSelector, closeAllSliders }, { listSliderIsOpen }] = useSliders()
  const snapshotId = useGetSnapshotId()
  const { data: snapshotInfo } = useGetSnapshotQuery(snapshotId)
  const [shortDate, longDate] = formatCreatedAtString(snapshotInfo?.createdAt)

  const [analyse, { data: axeData, error: axeError, loading: axeLoading }] = useAxeCore()
  const [
    createAnnotations,
    {
      data: createdAnnotationsData,
      error: createAnnotationsError,
      isLoading: createAnnotationsLoading,
    },
  ] = useCreateAnnotationsMutation(snapshotId)

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
            <span className="mt-1 text-sm text-gray-500 self-start" title={longDate}>
              {shortDate}
            </span>
          </div>
          <div className="self-center flex flex-nowrap">
            <ButtonWithTooltip
              onClick={openElementSelector}
              toolTipText="Create Annotation"
              className="text-gray-700 border border-gray-300 p-2 hover:bg-gray-200 rounded-l-lg"
            >
              {axeLoading ? (
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
        <div>
          <Alert
            color="red"
            title="Error"
            message="Error analysing snapshot! Please try again."
            hidden={!axeError}
          />

          <Alert
            color="green"
            title="Snapshot analysed"
            message={`Axe found ${axeData?.length || 0} problems!`}
            action={{
              name: 'Publish',
              method: () => createAnnotations({ snapshotId, annotations: axeData }),
              disabled: createAnnotationsLoading,
            }}
            hidden={!axeData}
          />

          <Alert
            color="red"
            title="Error"
            message="Error posting axe annotatons! Please try again."
            hidden={!createAnnotationsError}
          />

          <Alert
            color="green"
            title="Axe Annotations added"
            message={`${createdAnnotationsData?.length || 0} annotations added!`}
            hidden={!createdAnnotationsData}
          />
        </div>

        <div className="overflow-y-auto mb-auto">
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
