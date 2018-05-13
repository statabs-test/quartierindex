import * as React from 'react';
import { Rootstate } from '../../../state';
import { connect } from 'react-redux';
import { Indicator, WeightNumber } from '../../../state/indicator/types';
import Cancel from 'material-ui-icons/Cancel';
import {
  deselectIndicator,
  SetNegativeValuation,
  SetPositiveValuation,
  setWeight
} from '../../../state/indicator/actions';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { SentimentDissatisfied, SentimentSatisfied } from '@material-ui/icons';

interface Props {
  positiveValuation(id: string): void

  negativeValuation(id: string): void

  setIndicatorWeight(id: string, weight: WeightNumber): void

  deselect(id: string): void
}

export interface PublicProps {
  indicator: Indicator
  style: React.CSSProperties
}

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

const LegendItem = ({
                      indicator,
                      style,
                      negativeValuation,
                      positiveValuation,
                      setIndicatorWeight,
                      deselect
                    }: Props & PublicProps) => {
  return (
      <div key={indicator.id} className="legend-container" style={style}>
        <div className="legend-name"> {indicator.name}</div>

        <div
            className="rate-positive"
            onClick={() => positiveValuation(indicator.id)}
        >
          <SentimentSatisfied className="rating-icon"/>
        </div>
        <div
            className="rate-negativ"
            onClick={() => negativeValuation(indicator.id)}
        >
          <SentimentDissatisfied className="rating-icon"/>
        </div>
        <div className="weight">
          <Slider
              min={1}
              max={4}
              onChange={(value) => setIndicatorWeight(indicator.id, toWNumber(value))}
          />
        </div>

        <Cancel
            className="remove"

            onClick={() => deselect(indicator.id)}
        />
      </div>
  )
};

const mapStateToProps = (state: Rootstate, props: PublicProps) =>
    ({
      ...props,
    });

const mapDispatchToProps: Partial<Props> = ({
  positiveValuation: SetPositiveValuation,
  negativeValuation: SetNegativeValuation,
  setIndicatorWeight: setWeight,
  deselect: deselectIndicator
});

export default connect(mapStateToProps, mapDispatchToProps)(LegendItem);
