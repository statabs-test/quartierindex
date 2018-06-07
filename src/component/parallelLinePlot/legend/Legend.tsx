import * as React from 'react';
import { Rootstate } from '../../../state';
import { connect } from 'react-redux';
import { Indicator } from '../../../state/indicator/types';
import LegendItem from './LegendItem';

export interface EnhancedProps {
  selectedIndicators: Indicator[]
}

export interface StateFromProps {
  selectedIndicators: Indicator[]
}

const legendStyle = (indicators: Indicator[], indicator: Indicator): React.CSSProperties => {
  // Attention if you change the width of this element the widht 
  // of the plot in ChartContainer must be updated too!
  const elementWidth = 235;
  const spcaing = 8;
  const indicatorIndex = indicators.indexOf(indicator);
  const pos = (spcaing + elementWidth) * indicatorIndex;

  return {
    left: pos + 'px',
    width: elementWidth
  }
};

const Legend = ({selectedIndicators}: EnhancedProps) => {
  return (
      <div className="parallel-line-plot-legend">
        {
          selectedIndicators.map(i => {
            const style = legendStyle(selectedIndicators, i);

            return (<LegendItem key={i.id} style={style} indicator={i}/>)
          })
        }
      </div>
  );
};

const mapStateToProps = (state: Rootstate, props: StateFromProps) =>
    ({
      selectedIndicators: props.selectedIndicators
    });

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Legend);
