import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import Legend from './legend/Legend';
import ChartContainer from './ChartContainer';
import { Indicator } from '../../state/indicator/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';
import NavButton from '../customElements/NavButton';

export interface Props {
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

function ParallelLinePlot({selectedIndicators, toggleVisibility}: Props) {
  const disabled = !(selectedIndicators.length > 0);
  return (
      <div className="parallel-line-plot-container">
        <div>
          <NavButton variant="raised" to={'/'}>Auswahl</NavButton>
          <NavButton disabled={disabled} variant="raised" to={'ranking'}>Bewertung</NavButton>
          <NavButton disabled={disabled} variant="raised" to={'/importance'}>Gewichtung</NavButton>
        </div>
{/*        <Button
            className="add-indicator"
            variant="flat"
            onClick={() => toggleVisibility(false)}
        >
          Indikator Hinzufügen
        </Button>*/}

        <div id="scroll-area" className="parallel-line-plot-scroll-area">
          <Legend selectedIndicators={selectedIndicators}/>
          <ChartContainer/>
        </div>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  toggleVisibility: toggleIndicatorSelectionVisibility
});

export default connect(mapStateToProps, mapDispatchToProps)(ParallelLinePlot);