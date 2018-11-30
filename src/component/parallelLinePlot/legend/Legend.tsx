import * as React from 'react'
import { Rootstate } from '../../../state'
import { connect } from 'react-redux'
import { Indicator } from '../../../state/indicator/types'
import LegendItem from './LegendItem'

export interface EnhancedProps {
  selectedIndicators: Indicator[]
}

export interface StateFromProps {
  selectedIndicators: Indicator[]
}

const Legend = ({ selectedIndicators }: EnhancedProps) => {
  return (
    <div className="parallel-line-plot-legend">
      {selectedIndicators.map(i => {
        return <LegendItem key={i.id} indicator={i} />
      })}
      {/* empty LegendItem to add additional indicator */}
      <LegendItem key="emptyIndicator" />
    </div>
  )
}

const mapStateToProps = (state: Rootstate, props: StateFromProps) => ({
  selectedIndicators: props.selectedIndicators,
})

const mapDispatchToProps = null

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Legend)
