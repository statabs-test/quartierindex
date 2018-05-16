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
  return (
      <div className="parallel-line-plot-container">
        <h1 className="title">Some title</h1>

        <div>
          <NavButton variant="raised" to={'/'}>Schritt 1</NavButton>
          <NavButton variant="raised" to={'ranking'}>Schritt 2</NavButton>
          <NavButton variant="raised" to={'/importance'}>Schritt 3</NavButton>
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