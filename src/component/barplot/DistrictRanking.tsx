import * as React from 'react'
import { round, trim } from 'lodash'
import { connect } from 'react-redux'
import { AxisDomain, Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'
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
    payload: {value},
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

const domainOf = (data: { id: string, name: string, value: number }[])
  : [AxisDomain, AxisDomain] => {
  const values = data.map(d => d.value);
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (values.length === 0) return [0, 0]
  return [min, max]
}

const getTicks = (domain: [AxisDomain, AxisDomain], nTicks: number)
  : Number[] => {

  const calcOffset = (n1: number, n2: number)
    : number => {
    if ((n1 <= 0 && n2 <= 0) ||
      (n1 >= 0 && n2 >= 0))
      return Math.abs((Math.abs(n1) - Math.abs(n2))) / (nTicks - 1)

    return (Math.abs(n1) + Math.abs(n2)) / (nTicks - 1)
  }
  const min = Number(domain[0])
  const max = Number(domain[1])
  const offset = calcOffset(min, max)

  return Array(nTicks).fill(min)
    .map((v, index) => v + offset * index)
}

const DistrictRanking: React.StatelessComponent<PublicProps & InjectedProps>
  = ({
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

  const ticks = getTicks(domainOf(data), 4)
  return (
    <div className="left-grid district-ranking">
      <div className="container">
        {/* District ranking bar plot */}
        <BarChart data={data} width={280} height={530} layout="vertical">
          <CartesianGrid/>
          {/* TODO: Check color of bar*/}
          <XAxis
            axisLine={false}
            domain={domainOf(data)}
            interval="preserveStart"
            type="number"
            tickLine={false}
            ticks={ticks}
            tickFormatter={tick => tick.toString().substr(0, 5)}
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
                <Cell key={`cell-${index}`} fill={'black'}/>
              ) : (
                <Cell key={`cell-${index}`} fill={'#FFD300'}/>
              )
            )}
          </Bar>
        </BarChart>
        <div className="districtRankingExplanation">
          <p>
            Berechnungsergebnis aus: <br/>
            {indicators.map(indicator => {
              return (
                <React.Fragment key={indicator.id}>
                  <span className="districtRankingExplanationEntry">
                    - {indicator.name} mit einer Gewichtung von{' '}
                    {indicator.weight * indicator.valuation}
                  </span>
                  <br/>
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
