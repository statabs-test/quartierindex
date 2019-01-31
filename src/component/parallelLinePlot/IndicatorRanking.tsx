import * as React from 'react'
import { connect } from 'react-redux'
import { Rootstate } from '../../state'
import { getSelectedIndicators, getChoosableIndicators } from '../../state/indicator/selectors'
import Legend from './legend/Legend'
import { Indicator } from '../../state/indicator/types'
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions'
import { Redirect } from 'react-router'
import './paralell-line-plot.css'
import ChartContainer from './ChartContainer'

export interface Props {
  choosableIndicators: Indicator[]
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

const IndicatorRanking: React.SFC<Props> = props => {
  const { choosableIndicators, selectedIndicators } = props
  const additionalColumns = choosableIndicators.length !== 0 ? 1 : 0

  if (selectedIndicators.length === 0) {
    return <Redirect to="/" />
  }

  return (
    <div id="scroll-area" className="right-grid parallel-line-plot-scroll-area">
      <div
        className="parallel-line-plot-container"
        style={{ width: (190 + 8) * (selectedIndicators.length + additionalColumns) }}
      >
        <Legend selectedIndicators={selectedIndicators} />
        <ChartContainer />
      </div>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state),
  choosableIndicators: getChoosableIndicators(state),
})

const mapDispatchToProps = {
  toggleVisibility: toggleIndicatorSelectionVisibility,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndicatorRanking)
