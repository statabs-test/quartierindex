import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state/index';
import { allIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';

export interface Props {
    indicators: Indicator[]
}

function TestIndicators({ indicators }: Props) {
    return (
      <div>
        <h1>Alle Indikatoren</h1>
        {
                // Create an element per indicator item
                indicators.map(indicator => {
                    return (
                      <p key={indicator.id}>
                        {indicator.id} {indicator.name}
                        (selected: {indicator.selected ? 'true' : 'false'},
                          weight: {indicator.weight} )
                      </p>
                    );
                })
            }
     </div>
    );
}

const mapStateToProps = (state: Rootstate) => ({
    indicators: allIndicators(state)
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(TestIndicators);
