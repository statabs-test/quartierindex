import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import NavButton from '../customElements/NavButton';

export interface Props {
  selectedIndicators: Indicator[]

}

function AppNaviation({selectedIndicators}: Props) {
  const disabled = !(selectedIndicators.length > 0);
  return (
        <div className="App-navigation">
          <NavButton variant="raised" to={'/'}>Auswahl</NavButton>
          <NavButton disabled={disabled} variant="raised" to={'ranking'}>Bewertung</NavButton>
          <NavButton disabled={disabled} variant="raised" to={'/importance'}>Gewichtung</NavButton>
        </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

export default connect(mapStateToProps, null)(AppNaviation);