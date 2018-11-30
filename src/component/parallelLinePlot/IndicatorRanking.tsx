import * as React from 'react'
import { connect } from 'react-redux'
import { Rootstate } from '../../state'
import { getSelectedIndicators } from '../../state/indicator/selectors'
import Legend from './legend/Legend'
import { Indicator } from '../../state/indicator/types'
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions'
import { Redirect } from 'react-router'
import './paralell-line-plot.css'
import ChartContainer from './ChartContainer'

export interface Props {
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

const IndicatorRanking: React.SFC<Props> = props => {
  const { selectedIndicators } = props

  if (selectedIndicators.length === 0) {
    return <Redirect to="/" />
  }
  return (
    <div
      id="scroll-area"
      style={{ '--number-of-selected-indicators': selectedIndicators.length } as any}
      className="right-grid parallel-line-plot-scroll-area"
    >
      <div className="parallel-line-plot-container" style={{width: ( 190 + 6 ) * selectedIndicators.length}}>
        <Legend selectedIndicators={selectedIndicators} />
        <ChartContainer />
      </div>
    </div>
  )
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state),
})

const mapDispatchToProps = {
  toggleVisibility: toggleIndicatorSelectionVisibility,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndicatorRanking)
