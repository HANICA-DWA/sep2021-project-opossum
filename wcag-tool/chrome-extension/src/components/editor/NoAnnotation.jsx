import React from 'react'
import DefaultButton from '../common/DefaultButton'
import { useTranslation } from 'react-i18next'

const NoAnnotation = function ({ openElementSelector }) {
  const { t } = useTranslation()
  return (
    <div className="flex justify-center">
      <div className="p-1 text-black">
        <div className="flex p-4 flex-col items-center">
          <div className="folderIcon m-2" />
          <p className="text-xl m-2">
            <b>{t('NO_ANNOTATIONS')}</b>
          </p>
          <p className="m-2">{t('MARK_PROBLEMS')}</p>
          <DefaultButton onClick={openElementSelector}>{t('CREATE_ANNOTATION')}</DefaultButton>
        </div>
      </div>
    </div>
  )
}

export default NoAnnotation
