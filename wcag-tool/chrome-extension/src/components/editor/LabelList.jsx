import React from 'react'
import LabelListItem from './LabelListItem'

export default function LabelList({ labels = [], small }) {
  return labels.map((label) => <LabelListItem key={label} label={label} small={small} />)
}
