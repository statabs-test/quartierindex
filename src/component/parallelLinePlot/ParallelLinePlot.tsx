import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import Legend from './legend/Legend';
import ChartContainer from './ChartContainer';
import DistrictRanking from '../ranking/DistrictRanking';
import { Indicator } from '../../state/indicator/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { Link } from 'react-router-dom';

export interface Props {
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

function ParallelLinePlot({selectedIndicators, toggleVisibility}: Props) {
  return (
    <Grid item xs={8}>
    <Grid container spacing={8}>
    <Grid item xs={4}>
      <DistrictRanking title={'District Ranking'}/>
    </Grid>
    <Grid item xs={8}>
      <div className="parallel-line-plot-container">
        <Button variant="flat" onClick={() => toggleVisibility(false)}>Indikator Hinzufügen</Button>
        <div id="scroll-area" className="parallel-line-plot-scroll-area">
          <Legend selectedIndicators={selectedIndicators}/>
          <ChartContainer/>
        </div>
      </div>
      </Grid>
      </Grid>
      <Grid container justify="space-between">
        <Grid item xs={1}>
          <Link to={'/importance'}>
          <Button variant="raised">Zurück</Button>
          </Link>
        </Grid>
      </Grid>
      </Grid>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  selectedIndicators: getSelectedIndicators(state)
});

const mapDispatchToProps = ({
  toggleVisibility: toggleIndicatorSelectionVisibility
});

export default connect(mapStateToProps, mapDispatchToProps)(ParallelLinePlot);