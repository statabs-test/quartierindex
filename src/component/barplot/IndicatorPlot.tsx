import * as React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Bar, BarChart, CartesianGrid, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { round } from 'lodash'
import { Rank } from '../../state/observation/types'
import { Rootstate } from '../../state'
import { makeGetIndicatorRanking } from 'src/state/observation/selectors'
import { District } from '../../state/district/types'
import { Indicator, NegativePositive } from '../../state/indicator/types'
import { allDistrictsById } from 'src/state/district/selectors'
import { getColor } from '../../helpers'
export interface IndicatorPlotPublicProps {
  // indicator id
  indicator: Indicator
}

interface IndicatorProps {
  indicator: Indicator
  districts: { [key: string]: District }
  ranks: Rank[]
}

const IndicatorPlot: React.SFC<IndicatorProps> = ({ districts, indicator, ranks }) => {
  const data = ranks.map(rank => {
    return {
      name: districts[rank.districtId].name,
      value: round(rank.value, 2),
    }
  })

  const color = getColor(indicator.valuation === NegativePositive.Positive)

  return (
    <div className="bar-plot" key={indicator.id}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" width={500} height={1000}>
          <CartesianGrid />
          // TODO: Check color of bar
          <XAxis domain={[0, 1]} type="number" />
          {
            <YAxis
              dataKey="name"
              type="category"
              orientation="right"
              axisLine={false}
              hide={true}
            />
          }
          <Tooltip itemStyle={{ color: 'black' }} labelStyle={{ fontWeight: 'bold' }} />
          <Bar dataKey="value" fill={color.backgroundColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Each IndicatorPlot receives their own selector, only updates when something relevant changes
const makeMapStateToProps = () => {
  const getIndicatorRanking = makeGetIndicatorRanking()
  const mapStateToProps = (state: Rootstate, props: IndicatorPlotPublicProps): IndicatorProps => ({
    ranks: getIndicatorRanking(state, { id: props.indicator.id }),
    districts: allDistrictsById(state),
    ...props,
  })
  return mapStateToProps
}

export default compose<IndicatorProps, IndicatorPlotPublicProps>(
  connect(
    makeMapStateToProps,
    undefined
  )
)(IndicatorPlot)
