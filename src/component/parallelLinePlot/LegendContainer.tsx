import * as React from 'react';
import { Rootstate } from '../../state';
import { connect } from 'react-redux';
import { Indicator } from '../../state/indicator/types';

export interface EnhancedProps {
  selectedIndicators: Indicator[]

}

export interface StateFromProps {
  selectedIndicators: Indicator[]
}

const legendStyle = (indicators: Indicator[], indicator: Indicator) => {
  const width = 100;
  const elementWidth = width / 3;
  const indicatorIndex = indicators.indexOf(indicator);
  const pos = elementWidth * indicatorIndex;

  return {
    background: 'red',
    left: pos + '%'
  }
};
const LegendContainer = ({selectedIndicators}: EnhancedProps) => {
  return (
      <div className="parallel-line-plot-legend">
        {
          selectedIndicators.map(i => {
                const style = legendStyle(selectedIndicators, i);
                return <div key={i.id} className="legend-container" style={style}>
                  {i.name}
                </div>
              }
          )
        }
      </div>
  );
};

const mapStateToProps = (state: Rootstate, props: StateFromProps) =>
    ({
      selectedIndicators: props.selectedIndicators
    });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LegendContainer);
