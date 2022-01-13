import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LabelListItem({ label, small }) {
  const { t } = useTranslation()
  const labelColors = {
    'auto analysis': 'bg-yellow-900',
    draft: 'bg-purple-500',
    'level A': 'bg-blue-300',
    'level AA': 'bg-blue-500',
    'level AAA': 'bg-blue-800',
    minor: 'bg-green-600',
    moderate: 'bg-yellow-600',
    serious: 'bg-red-600',
    critical: 'bg-black',
  }
  return (
    <span
      key={label}
      className={`font-poppins text-xs inline-block ${
        labelColors[label]
      } rounded text-white align-middle ${small ? 'px-1.5 mb-1 mr-1.5' : 'mb-2 mr-2 px-2 py-0.5'}`}
    >
      {t(label)}
    </span>
  )
}
