import * as React from 'react'
import { round } from 'lodash'
import { connect } from 'react-redux'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Rootstate } from '../../state'
import { getSortedGlobalRanking } from '../../state/observation/selectors'
import { Rank } from 'src/state/observation/types'
import { allDistrictsById } from 'src/state/district/selectors'
import { District } from 'src/state/district/types'

export interface PublicProps {
  className?: string
}

interface InjectedProps {
  ranks: Rank[]
  districts: { [key: string]: District }
}

const DistrictRanking: React.StatelessComponent<PublicProps & InjectedProps> = ({
  districts,
  ranks,
}) => {
  const data = ranks.map((rank, i) => {
    const rankNum = i + 1
    return {
      name: rankNum + '. ' + districts[rank.districtId].name,
      value: round(rank.value, 2),
    }
  })

  return (
    <div className="left-grid district-ranking">
      <div className="container">
        {/* District ranking bar plot */}
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical">
            <CartesianGrid />
            // TODO: Check color of bar
            <XAxis domain={[-1, 1]} type="number" />
            <YAxis
              // mirror
              dataKey="name"
              type="category"
              orientation="right"
              axisLine={false}
            />
            <Bar dataKey="value" fill="#FFD300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  ranks: getSortedGlobalRanking(state),
  districts: allDistrictsById(state),
})

export default connect(mapStateToProps)(DistrictRanking)
