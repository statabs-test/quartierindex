import * as React from 'react';
import { Rootstate } from '../../state';
import { connect } from 'react-redux';
import { Indicator, WeightNumber } from '../../state/indicator/types';
import {
  deselectIndicator,
  selectIndicator,
  SetNegativeValuation,
  SetPositiveValuation,
  setWeight
} from '../../state/indicator/actions';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

export interface EnhancedProps {
  selectedIndicators: Indicator[]

  positiveValuation(id: string): void

  negativeValuation(id: string): void

  setIndicatorWeight(id: string, weight: WeightNumber): void

  select(id: string): void

  deselect(id: string): void

}

export interface StateFromProps {
  selectedIndicators: Indicator[]
}

const legendStyle = (indicators: Indicator[], indicator: Indicator) => {
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

const toWNumber = (weightValue: number): WeightNumber => {
  switch (weightValue) {
    case 1 :
      return WeightNumber.ONE;

    case 2 :
      return WeightNumber.TWO;

    case 3 :
      return WeightNumber.THREE;

    default :
      return WeightNumber.FOUR;
  }
};

const LegendContainer = ({
                           selectedIndicators,
                           negativeValuation,
                           positiveValuation,
                           setIndicatorWeight,
                           deselect,
                           select
                         }: EnhancedProps) => {
  return (
      <div className="parallel-line-plot-legend">
        {
          selectedIndicators.map(i => {
                const style = legendStyle(selectedIndicators, i);
                return (
                    <div key={i.id} className="legend-container" style={style}>
                      <div className="legend-name"> {i.name}</div>

                      <div
                          className="rate-positive"
                          onClick={() => positiveValuation(i.id)}
                      >
                        +
                      </div>

                      <div
                          className="rate-negativ"
                          onClick={() => negativeValuation(i.id)}
                      >
                        -
                      </div>

                      <div className="weight">
                        <Slider
                            min={1}
                            max={4}
                            onChange={(value) => setIndicatorWeight(i.id, toWNumber(value))}
                        />
                      </div>

                      <div
                          className="remove"
                          onClick={() => deselect(i.id)}
                      >
                        X
                      </div>
                    </div>
                )
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

const mapDispatchToProps = ({
  positiveValuation: SetPositiveValuation,
  negativeValuation: SetNegativeValuation,
  setIndicatorWeight: setWeight,
  select: selectIndicator,
  deselect: deselectIndicator
});

export default connect(mapStateToProps, mapDispatchToProps)(LegendContainer);
