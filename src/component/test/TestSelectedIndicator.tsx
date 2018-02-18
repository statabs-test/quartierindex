import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { selectedIndicators } from '../../state/indicator/selectors';
import { Indicator, WeightNumber } from '../../state/indicator/types';
import {
  SetPositiveValuation, SetNegativeValuation, setWeight,
} from '../../state/indicator/actions';

export interface Props {
  indicators: Indicator[],
  positiveValuation(id: string): void
  negativeValuation(id: string): void
  setIndicatorWeight(id: string, weight: WeightNumber): void
}

function TestSelectedIndicators({ indicators, positiveValuation, negativeValuation, setIndicatorWeight }: Props) {
    return (
      <div>
        <h1>Selektierte Indikatoren</h1>
        {
                // Create an element per indicator item
                indicators.map(indicator => {
                    return (
                      <p key={indicator.id}>
                        {indicator.id} {indicator.name} ({indicator.valuation})
                        <button onClick={() => positiveValuation(indicator.id)}>Positiv</button>
                        <button onClick={() => negativeValuation(indicator.id)}>Negativ</button>
                        Gewicht:
                        <button onClick={() => setIndicatorWeight(indicator.id, WeightNumber.ONE)}>
                          {indicator.weight === WeightNumber.ONE ? <b>ONE</b> : <span>ONE</span>}
                        </button>

                        <button onClick={() => setIndicatorWeight(indicator.id, WeightNumber.TWO)}>
                          {indicator.weight === WeightNumber.TWO ? <b>TWO</b> : <span>TWO</span>}
                        </button>
                        <button onClick={() => setIndicatorWeight(indicator.id, WeightNumber.THREE)}>
                          {indicator.weight === WeightNumber.THREE ? <b>THREE</b> : <span>THREE</span>}
                        </button>
                        <button onClick={() => setIndicatorWeight(indicator.id, WeightNumber.FOUR)}>
                          {indicator.weight === WeightNumber.FOUR ? <b>FOUR</b> : <span>FOUR</span>}
                        </button>
                      </p>
                    );
                })
            }
     </div>
    );
}

const mapStateToProps = (state: Rootstate) => ({
    indicators: selectedIndicators(state)
});

const mapDispatchToProps = ({
  positiveValuation: SetPositiveValuation,
  negativeValuation: SetNegativeValuation,
  setIndicatorWeight: setWeight,
});

export default connect(mapStateToProps, mapDispatchToProps)(TestSelectedIndicators);
