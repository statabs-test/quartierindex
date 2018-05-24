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
import {
  getClassNameNegPosBorder,
  getClassNameSelectedUnselected, getLabelBy
} from '../../../helpers';

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

const LegendItem = ({
                      indicator,
                      style,
                      negativeValuation,
                      positiveValuation,
                      setIndicatorWeight,
                      deselect
                    }: Props & PublicProps) => {
  return (
      <div
          key={indicator.id}
          className={'legend-container' + getClassNameNegPosBorder(indicator)}
          style={style}
      >
        <div className={'legend-container-left'}>
            <div className={'legend-name'}> {indicator.name}</div>

            <div
                className="rate-positive"
                onClick={() => positiveValuation(indicator.id)}
            >
              <SentimentSatisfied
                  className={'rating-icon' + getClassNameSelectedUnselected(indicator, 'positive')}
              />
            </div>
            <div
                className="rate-negativ"
                onClick={() => negativeValuation(indicator.id)}
            >
              <SentimentDissatisfied
                  className={'rating-icon' + getClassNameSelectedUnselected(indicator, 'negative')}
              />
            </div>
        </div>
          <div className="legend-container-right">
            <Cancel
                className={'remove'}

                onClick={() => deselect(indicator.id)}
            />
          </div>

          <div className="weight">
              <Slider
                  min={0.25}
                  max={1.00}
                  step={0.25}
                  value={indicator.weight}
                  marks={{
                      0.25: '',
                      0.5: '',
                      0.75: '',
                      1: ''
                  }}
                  onChange={(value) => setIndicatorWeight(indicator.id, value)}
              />
              <div className="weight-label">
                  {getLabelBy(indicator.weight)}
              </div>
          </div>
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
