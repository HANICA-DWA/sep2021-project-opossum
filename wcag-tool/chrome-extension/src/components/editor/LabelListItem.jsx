import React from 'react'

export default function LabelListItem({ label }) {
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
      className={`text-sm mb-2 mr-2 inline-block font-medium ${labelColors[label]} px-2 py-0.5 rounded text-white align-middle`}
    >
      {label}
    </span>
  )
}
