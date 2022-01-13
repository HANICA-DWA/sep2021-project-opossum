import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DefaultButton from '../common/DefaultButton'
import { Icon } from '../common/Icon'
import DropdownOption from './DropdownOption'
import TextOption from './TextOption'
import ToggleOption from './ToggleOption'

const OptionsForm = function () {
  const [options, setOptions] = useState({ username: '', sideBySide: false, language: 'en' })
  const [saved, setSaved] = useState(true)
  const { i18n, t } = useTranslation()

  const languageOptions = [
    {
      language: t('LANGUAGE_EN'),
      value: 'en',
    },
    {
      language: t('LANGUAGE_NL'),
      value: 'nl',
    },
    {
      language: t('LANGUAGE_BG'),
      value: 'bg',
    },
    {
      language: t('LANGUAGE_FR'),
      value: 'fr',
    },
    {
      language: t('LANGUAGE_ES'),
      value: 'es',
    },
    {
      language: t('LANGUAGE_PT'),
      value: 'pt',
    },
    {
      language: t('LANGUAGE_GR'),
      value: 'gr',
    },
    {
      language: t('LANGUAGE_DE'),
      value: 'de',
    },
    {
      language: t('LANGUAGE_NO'),
      value: 'no',
    },
    {
      language: t('LANGUAGE_SV'),
      value: 'sv',
    },
    {
      language: t('LANGUAGE_IT'),
      value: 'it',
    },
    {
      language: t('LANGUAGE_FI'),
      value: 'fi',
    },
    {
      language: t('LANGUAGE_PL'),
      value: 'pl',
    },
    {
      language: t('LANGUAGE_JP'),
      value: 'jp',
    },
  ]

  useEffect(() => {
    chrome.storage.sync.get(['options'], (result) => {
      i18n.changeLanguage(result.options.language)
      setOptions((prevState) => ({ ...prevState, ...result.options }))
    })
  }, [])

  const saveOptions = () => {
    i18n.changeLanguage(options.language)
    chrome.storage.sync.set(
      {
        options,
      },
      () => {
        setSaved(true)
      }
    )
  }

  const handleChange = (name, value) => {
    setOptions((prevState) => ({ ...prevState, [name]: value }))
    setSaved(false)
  }

  return (
    <div className="m-6">
      <h1 className="text-xl font-poppins mb-3">{t('OPTIONS')}</h1>
      <TextOption
        value={options.username}
        id="username"
        labelName={t('USERNAME')}
        onChange={handleChange}
        placeholder={t('USERNAME')}
      />
      <ToggleOption
        labelName={t('SIDE_BY_SIDE')}
        infoTitle={t('SIDE_BY_SIDE_INFO')}
        id="sideBySide"
        value={options.sideBySide}
        onChange={handleChange}
      />

      <DropdownOption
        labelName={t('LANGUAGE')}
        id="language"
        options={languageOptions}
        value={options.language}
        onChange={handleChange}
      />

      <div className="flex justify-center my-2">
        <DefaultButton disabled={!options.username || saved} onClick={saveOptions} type="button">
          <Icon
            name={`${!saved ? 'save' : 'check'}`}
            type="outline"
            className="inline mx-2"
            size={6}
            viewBox={24}
          />

          {saved ? t('SAVED') : t('SAVE')}
        </DefaultButton>
      </div>
    </div>
  )
}

export default OptionsForm
