import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import NavButton from '../customElements/NavButton';
import './navigation.css';

export interface Props {
  selectedIndicators: Indicator[]

}

function AppNaviation({selectedIndicators}: Props) {
  const disabled = (selectedIndicators.length <= 0);
  return (
      <div className="right-grid navigation">
        <NavButton
            className="nav-button"
            variant="raised"
            to={'/'}
        >
          Auswahl
        </NavButton>

        <NavButton
            className="nav-button"
            disabled={disabled}
            variant="raised"
            to={'ranking'}
        >
          Bewertung
        </NavButton>

        <NavButton
            className="nav-button"
            disabled={disabled}
            variant="raised"
            to={'/importance'}
        >
          Gewichtung
        </NavButton>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

export default connect(mapStateToProps, null)(AppNaviation);