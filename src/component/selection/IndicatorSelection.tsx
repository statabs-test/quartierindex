import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state/index';
import { allIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { deselectIndicator, selectIndicator, } from '../../state/indicator/actions';
import { getUtil } from '../../state/util/selectors';
import { Util } from '../../state/util/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';

export interface Props {
  indicators: Indicator[],
  util: Util

  select(id: string): void

  deselect(id: string): void

  toggleVisibility(visibility: boolean): void
}

const isVisible = (util: Util): any => ({
  'visibility': util.selectIndicatorConf.visible ? 'visible' : 'hidden'
});

function IndicatorSelection({indicators, util, select, deselect, toggleVisibility}: Props) {
  return (

      <div className="floating-container" style={isVisible(util)}>
        {console.log(util)}
        <div className="selection-container">
          <div style={{textAlign: 'right'}} onClick={() => toggleVisibility(util.selectIndicatorConf.visible)}>
            X
          </div>
          <h1>Alle Indikatoren</h1>
          {
            // Create an element per indicator item
            indicators.map(indicator => {
              return (
                  <p style={{margin: 0}} key={indicator.id}>
                    {indicator.id} {indicator.name}
                    (selected: {indicator.selected ? 'true' : 'false'},
                    weight: {indicator.weight} )
                    {indicator.selected ?
                        (<button onClick={() => deselect(indicator.id)}>DeSelect</button>) :
                        (<button onClick={() => select(indicator.id)}>Select</button>)
                    }
                  </p>
              );
            })
          }
        </div>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  indicators: allIndicators(state),
  util: getUtil(state)
});

const mapDispatchToProps = ({
  select: selectIndicator,
  deselect: deselectIndicator,
  toggleVisibility: toggleIndicatorSelectionVisibility
});

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorSelection);
