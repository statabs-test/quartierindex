import React from 'react'
import { trim } from 'lodash'
import { LabelProps, ContentRenderer } from 'recharts'

const DistrictLabel: ContentRenderer<LabelProps> = props => {
  const { x, y, width, height, value } = props

  let xNew = 0
  let text = value
  switch (value[0]) {
    // single number 1-9
    case ' ': {
      xNew = x + 6.5
      break
    }
    // Basel-Stadt special
    case 'X': {
      xNew = x + 20.5
      if (typeof value === 'string') {
        text = value.substr(1)
      }
      break
    }
    // multi number 10-99
    default:
      xNew = x
      break
  }
  // const xNew = value[0] === ' ' ? x + 6.5 : x
  const yNew = y + 12.5

  return (
    <text
      width={width}
      height={height}
      x={xNew}
      y={yNew}
      fill={'black'}
      className="recharts-text recharts-cartesian-axis-tick-value"
      textAnchor="start"
    >
      {value[0] === 'X' ? (
        <tspan className="bold">{trim(text.toString())}</tspan>
      ) : (
        <tspan>{trim(text.toString())}</tspan>
      )}
    </text>
  )
}

export default DistrictLabel
