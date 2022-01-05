import React from 'react'
import SlidingPane from 'react-sliding-pane'
import './react-sliding-pane.css'

import IconButton from '../common/IconButton'
import { useAnalyse, useYAnnotations, useSliders } from '../../hooks'

import AnnotationList from './AnnotationList'
import NoAnnotation from './NoAnnotation'
import Awareness from './Awareness'
import { useGetSnapshotQuery, useCreateAnnotationsMutation } from '../../services'
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
  const [
    createAnnotations,
    { error: createAnnotationsError, isLoading: createAnnotationsLoading },
  ] = useCreateAnnotationsMutation(snapshotId)
  const [analyse, { data: analyseAnnotations, error, loading }] = useAnalyse()

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
        {error && (
          <div className="bg-red-100 border-l-4 border-red-700 text-red-700 p-3" role="alert">
            <p>{error}</p>
          </div>
        )}

        {createAnnotationsError && (
          <div className="bg-red-100 border-l-4 border-red-700 text-red-700 p-3" role="alert">
            <p>{createAnnotationsError}</p>
          </div>
        )}

        {!analyseAnnotations && (
          <div
            className="bg-green-100 border-l-4 border-green-700 text-green-700 p-3 flex justify-between"
            role="alert"
          >
            <div>
              {' '}
              <p className="font-bold">Snapshot analysed</p>
              <p>{analyseAnnotations?.length || 0} problems found!</p>
            </div>
            <button
              type="button"
              className="py-1 px-3 border-green-400 bg-green-700 hover:bg-green-800 text-gray-100  rounded-lg focus:border-4"
              onClick={() => createAnnotations({ snapshotId, annotation: analyseAnnotations })}
              disabled={createAnnotationsLoading}
            >
              Publish
            </button>
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
