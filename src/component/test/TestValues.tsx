import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state/index';
import { allIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';

export interface Props {
    indicators: Indicator[]
}

function TestValues({ indicators }: Props) {
    return (
        <ol>
            {
                // Create an element per indicator item
                indicators.map(indicator => {
                    return (
                      <li key={indicator.id}>
                        {indicator.id} has values selected:
                          {indicator.selected ? 'true' : 'false'},
                          weight: {indicator.weight}
                      </li>
                    );
                })
            }
                </ol>
    );
}

const mapStateToProps = (state: Rootstate) => ({
    indicators: allIndicators(state)
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(TestValues);
