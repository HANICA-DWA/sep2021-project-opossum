import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultButton from '../common/DefaultButton'
import { onClickCreateSnapshot } from '../../hooks/popup.hooks'
import { useTranslation } from 'react-i18next'

const NoSnapshotsFound = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const createSnapshotNotAllowed = useSelector((state) => state.popup.createSnapshotNotAllowed)
  const createSnapshotMessage = useSelector((state) => state.popup.createSnapshotMessage)
  const [loading, setLoading] = useState(false)

  return (
    <div className="p-1 text-black">
      <div className="flex p-4 flex-col items-center">
        <div className="folderIcon m-2" />
        <p className="text-xl m-2 font-poppins-semi">{t('NO_SNAPSHOTS')}</p>
        <p className="m-2">{t('START_ANALYSES')}</p>
        <DefaultButton
          title={createSnapshotMessage}
          disabled={createSnapshotNotAllowed}
          loading={loading}
          onClick={onClickCreateSnapshot(setLoading, dispatch, t)}
        >
          {t('CREATE_SNAPSHOT')}
        </DefaultButton>
      </div>
    </div>
  )
}

export default NoSnapshotsFound
