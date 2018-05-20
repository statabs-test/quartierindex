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
  const width = 100;
  const elementWidth =
      width /
      (indicators.length <= 3 ?
              3 : (indicators.length - 1)
      );
  const indicatorIndex = indicators.indexOf(indicator);
  const pos = elementWidth * indicatorIndex;

  return {
    left: pos + '%'
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
