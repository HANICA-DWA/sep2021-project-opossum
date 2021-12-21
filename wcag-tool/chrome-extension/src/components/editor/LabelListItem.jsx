import React from 'react'

export default function LabelListItem({ label }) {
  const labelColors = {
    'Auto analysis': 'bg-yellow-900',
    Draft: 'bg-yellow-500',
    'Level A': 'bg-green-400',
    'Level AA': 'bg-green-600',
    'Level AAA': 'bg-green-800',
  }
  return (
    <span
      key={label}
      className={`text-sm font-medium mr-2 ${labelColors[label]} px-2 py-0.5 rounded text-gray-50 align-middle`}
    >
      {label}
    </span>
  )
}
