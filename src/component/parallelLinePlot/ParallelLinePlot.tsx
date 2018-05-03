import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { allDistricts } from '../../state/district/selectors';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { getLineRanking, getRankingDataForChart } from '../../state/observation/selectors';
import LegendContainer from './LegendContainer';
import ChartContainer from './ChartContainer';
import { Indicator } from '../../state/indicator/types';
import { toggleIndicatorSelectionVisibility } from '../../state/util/actions';

export interface Props {
  selectedIndicators: Indicator[]

  toggleVisibility(visibility: boolean): void
}

function ParallelLinePlot ({selectedIndicators, toggleVisibility}: Props) {
  return (
      <div className="parallel-line-plot-container">
        <h1 className="title">Some title</h1>
        <div className="add-indicator" onClick={() => toggleVisibility(false)}>
          Indikator Hinzufügen
        </div>
        <div id="scroll-area" className="parallel-line-plot-scroll-area">
          <LegendContainer selectedIndicators={selectedIndicators}/>
          <ChartContainer/>
        </div>
      </div>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  selectedIndicators: getSelectedIndicators(state),
  rankingData: getRankingDataForChart(state),
  lineRanking: getLineRanking(state)

});

const mapDispatchToProps = ({
  toggleVisibility: toggleIndicatorSelectionVisibility
});

export default connect(mapStateToProps, mapDispatchToProps)(ParallelLinePlot);