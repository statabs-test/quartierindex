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

const ledgendStyle = (indicators: Indicator[], indicator: Indicator) => {
  const width = 750;
  const elementWidth = width / 3;
  const numberOfIndicators = indicators.length;
  const indicatorIndex = indicators.indexOf(indicator);
  let pos = 0;

  if (indicatorIndex === 0) {
    if (numberOfIndicators === 1) {
      pos = width / 2 - elementWidth / 2
    } else {
      pos = 0
    }
  } else {
    if (numberOfIndicators === 1) {
      pos = width / 2;
    } else if (numberOfIndicators === 2) {
      pos = elementWidth * 2;

    } else if (numberOfIndicators === 3) {
      if (indicatorIndex === 1) {
        pos = elementWidth;

      } else {
        pos = elementWidth * 2;
      }

    } else {
      pos = elementWidth * indicatorIndex;
    }
  }

  return {
    background: 'red',
    left: pos
  }
};
const LegendContainer = ({selectedIndicators}: EnhancedProps) => {
  return (
      <div className="parallel-line-plot-legend">
        {
          selectedIndicators.map(i => {
                const style = ledgendStyle(selectedIndicators, i);
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
