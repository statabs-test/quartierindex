import * as React from 'react'
import { round } from 'lodash'
import { connect } from 'react-redux'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts'
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

const DistrictRanking: React.StatelessComponent<PublicProps & InjectedProps> = ({
  districts,
  ranks,
  indicators,
}) => {
  const data = ranks.map((rank, i) => {
    const rankNum = i + 1
    return {
      name: rankNum + '. ' + districts[rank.districtId].name,
      value: round(rank.value, 2),
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
            domain={[-1, 1]}
            interval="preserveStart"
            type="number"
            tickLine={false}
            ticks={ticks}
            tickFormatter={tick => (ticks.indexOf(tick) % 2 === 0 ? tick : '')}
          />
          <YAxis width={130} dataKey="name" type="category" orientation="right" axisLine={false} />
          <Bar dataKey="value" fill="#FFD300" />
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
