import * as React from 'react'
import { Rootstate } from '../../../state'
import { connect } from 'react-redux'
import { Indicator } from '../../../state/indicator/types'
import LegendItem from './LegendItem'
import { getChoosableIndicators } from '../../../state/indicator/selectors'
import { compose } from 'recompose'

export interface EnhancedProps {
  choosableIndicators: Indicator[]
  selectedIndicators: Indicator[]
}

export interface StateFromProps {
  selectedIndicators: Indicator[]
}

const Legend = ({ choosableIndicators, selectedIndicators }: EnhancedProps) => {
  return (
    <div className="parallel-line-plot-legend">
      {selectedIndicators.map(i => {
        return <LegendItem key={i.id} indicator={i} />
      })}
      {/* empty LegendItem to add additional indicator */}
      {choosableIndicators.length !== 0 ? <LegendItem key="emptyIndicator" /> : null}
    </div>
  )
}

const mapStateToProps = (state: Rootstate, props: StateFromProps) => ({
  selectedIndicators: props.selectedIndicators,
  choosableIndicators: getChoosableIndicators(state),
})

export default compose<EnhancedProps, StateFromProps>(
  connect(
    mapStateToProps,
    undefined
  )
)(Legend)
