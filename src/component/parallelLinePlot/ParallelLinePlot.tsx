import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import Legend from './legend/Legend';
import ChartContainer from './ChartContainer';
import { Indicator } from '../../state/indicator/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

export interface Props {
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

function ParallelLinePlot({selectedIndicators, toggleVisibility}: Props) {
  return (
      <div className="parallel-line-plot-container">
        <h1 className="title">Some title</h1>

        <div>
          <Link to={'/'}>
            <Button variant="raised">Schritt 1</Button>
          </Link>
          <Link to={'/ranking'}>
            <Button variant="raised">Schritt 2</Button>
          </Link>
          <Link to={'/importance'}>
            <Button variant="raised">Schritt 1</Button>
          </Link>
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