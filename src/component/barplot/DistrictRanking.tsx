import * as React from 'react'
import { round, trim } from 'lodash'
import { connect } from 'react-redux'
import { BarChart, Bar, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'
import { Rootstate } from '../../state'
import { getSortedGlobalRanking } from '../../state/observation/selectors'
import { Rank } from '../../state/observation/types'
import { Indicator } from '../../state/indicator/types'
import { allDistrictsById } from '../../state/district/selectors'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import { District } from '../../state/district/types'

export interface PublicProps {
  className?: string
}

interface InjectedProps {
  ranks: Rank[]
  districts: { [key: string]: District }
  indicators: Indicator[]
}

const WhiteSpacePreservedTick = (props: any) => {
  const {
    x,
    y,
    width,
    height,
    payload: { value },
  } = props

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
  const yNew = y + 4

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
        <tspan className="bold">{trim(text)}</tspan>
      ) : (
        <tspan>{trim(text)}</tspan>
      )}
    </text>
  )
}

const DistrictRanking: React.StatelessComponent<PublicProps & InjectedProps> = ({
  districts,
  ranks,
  indicators,
}) => {
  let rankNum = 0
  const data = ranks.map((rank, i) => {
    if (rank.districtId !== '99') {
      rankNum = rankNum + 1
      return {
        name: `${rankNum < 10 ? ' ' : ''}${rankNum}. ${districts[rank.districtId].name}`,
        value: round(rank.value, 2),
        id: rank.districtId,
      }
    }
    //    rankNum = rankNum - 1
    // Basel-Stadt without rank (number), see handling in WhiteSpacePreservedTick
    return {
      name: `X ${districts[rank.districtId].name}`,
      value: round(rank.value, 2),
      id: rank.districtId,
    }
  })

  const ticks = [-1, -0.5, 0, 0.5, 1]

  return (
    <div className="left-grid district-ranking">
      <div className="container">
        {/* District ranking bar plot */}
        <BarChart data={data} width={280} height={530} layout="vertical">
          <CartesianGrid />
          {/* TODO: Check color of bar*/}
          <XAxis
            axisLine={false}
            domain={[-1, 1]}
            interval="preserveStart"
            type="number"
            tickLine={false}
            ticks={ticks}
            tickFormatter={tick => (ticks.indexOf(tick) % 2 === 0 ? tick : '')}
          />
          <YAxis
            width={130}
            dataKey="name"
            type="category"
            orientation="right"
            tick={WhiteSpacePreservedTick}
            axisLine={false}
            tickLine={false}
          />
          <Bar dataKey="value">
            {data.map((entry, index) =>
              entry.id === '99' ? (
                <Cell key={`cell-${index}`} fill={'black'} />
              ) : (
                <Cell key={`cell-${index}`} fill={'#FFD300'} />
              )
            )}
          </Bar>
        </BarChart>
        <div className="districtRankingExplanation">
          <p>
            Berechnungsergebnis aus: <br />
            {indicators.map(indicator => {
              return (
                <React.Fragment key={indicator.id}>
                  <span className="districtRankingExplanationEntry">
                    - {indicator.name} mit einer Gewichtung von{' '}
                    {indicator.weight * indicator.valuation}
                  </span>
                  <br />
                </React.Fragment>
              )
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  ranks: getSortedGlobalRanking(state),
  districts: allDistrictsById(state),
  indicators: getSelectedIndicators(state),
})

export default connect(mapStateToProps)(DistrictRanking)
