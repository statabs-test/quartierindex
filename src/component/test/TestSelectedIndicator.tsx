import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { selectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import {
  SetPositiveValuation, SetNegativeValuation,
} from '../../state/indicator/actions';

export interface Props {
  indicators: Indicator[],
  positiveValuation(id: string): void
  negativeValuation(id: string): void
}

function TestSelectedIndicators({ indicators, positiveValuation, negativeValuation }: Props) {
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
  negativeValuation: SetNegativeValuation
});

export default connect(mapStateToProps, mapDispatchToProps)(TestSelectedIndicators);
