import * as React from 'react'
import { round, isEqual } from 'lodash'
import { connect } from 'react-redux'
import { AxisDomain, Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis, Label } from 'recharts'
import { Rootstate } from '../../state'
import { getSortedGlobalRanking } from '../../state/observation/selectors'
import { Rank } from '../../state/observation/types'
import { Indicator } from '../../state/indicator/types'
import { allDistrictsById } from '../../state/district/selectors'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import { District } from '../../state/district/types'
import DistrictLabel from './DistrictLabel'
import AnimatePosition from './AnimatePosition'
import { getRankPosition } from '../../helpers'
import './districtRanking.css'

export interface PublicProps {
  className?: string
}

interface InjectedProps {
  ranks: Rank[]
  districts: { [key: string]: District }
  indicators: Indicator[]
}

export type Positions = {
  [id: string]: number
}

interface StateProps {
  positions: Positions
}

const domainOf = (
  data: { id: string; name: string; value: number }[]
): [AxisDomain, AxisDomain] => {
  const values = data.map(d => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  if (values.length === 0) return [0, 0]
  return [min, max]
}

const getTicks = (domain: [AxisDomain, AxisDomain], nTicks: number): Number[] => {
  const calcOffset = (n1: number, n2: number): number => {
    if ((n1 <= 0 && n2 <= 0) || (n1 >= 0 && n2 >= 0))
      return Math.abs(Math.abs(n1) - Math.abs(n2)) / (nTicks - 1)

    return (Math.abs(n1) + Math.abs(n2)) / (nTicks - 1)
  }
  const min = Number(domain[0])
  const max = Number(domain[1])
  const offset = calcOffset(min, max)

  return Array(nTicks)
    .fill(min)
    .map((v, index) => v + offset * index)
}

class DistrictRanking extends React.Component<PublicProps & InjectedProps, StateProps> {
  constructor(props: any) {
    super(props)
    this.state = { positions: {} }
  }

  render() {
    const { districts, ranks, indicators } = this.props
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
      // Basel-Stadt without rank (number), see handling in DistrictLabel
      return {
        name: `X ${districts[rank.districtId].name}`,
        value: round(rank.value, 2),
        id: rank.districtId,
      }
    })

    const positions = getRankPosition(data)
    const positionsBefore = this.state.positions

    const ticks = getTicks(domainOf(data), 4)
    return (
      <div className="left-grid district-ranking">
        <div className="container">
          {/* District ranking bar plot */}
          <AnimatePosition
            from={positionsBefore ? positionsBefore : positions}
            to={positions}
            onRest={() =>
              !isEqual(positionsBefore, positions) ? this.setState({ positions: positions }) : {}
            }
          >
            {props => {
              return (
                <BarChart data={data} width={280} height={530} layout="vertical">
                  <CartesianGrid />
                  {/* TODO: Check color of bar*/}
                  <XAxis
                    axisLine={false}
                    domain={domainOf(data)}
                    interval="preserveStart"
                    type="number"
                    tickLine={false}
                    ticks={ticks}
                    tickFormatter={tick =>
                      tick > 0 ? tick.toString().substr(0, 4) : tick.toString().substr(0, 5)
                    }
                  />
                  <YAxis
                    width={130}
                    dataKey="name"
                    type="category"
                    orientation="right"
                    axisLine={false}
                    tick={false}
                    tickLine={false}
                  >
                    {data.map(entry => {
                      return (
                        <Label
                          content={DistrictLabel}
                          key={entry.id}
                          x={150}
                          y={props[entry.id]}
                          value={entry.name}
                        />
                      )
                    })}
                  </YAxis>
                  <Bar dataKey="value">
                    {data.map((entry, index) =>
                      entry.id === '99' ? (
                        <Cell key={`cell-${index}`} fill={'black'} y={props[entry.id]} />
                      ) : (
                        <Cell key={`cell-${index}`} fill={'#FFD300'} y={props[entry.id]} />
                      )
                    )}
                  </Bar>
                </BarChart>
              )
            }}
          </AnimatePosition>
          <div className="districtRankingExplanation">
            <p>
              Berechnungsergebnis aus: <br />
              <ul>
                {indicators.map(indicator => {
                  return (
                    <React.Fragment key={indicator.id}>
                      <li>
                        {indicator.name} mit Gewicht {indicator.weight * indicator.valuation}
                      </li>
                    </React.Fragment>
                  )
                })}
              </ul>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: Rootstate) => ({
  ranks: getSortedGlobalRanking(state),
  districts: allDistrictsById(state),
  indicators: getSelectedIndicators(state),
})

export default connect(mapStateToProps)(DistrictRanking)
