import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { allDistricts } from '../../state/district/selectors';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { getLineRanking, getRankingDataForChart } from '../../state/observation/selectors';
import LegendContainer from './LegendContainer';
import ChartContainer from './ChartContainer';
import { Indicator } from '../../state/indicator/types';

export interface Props {
  selectedIndicators: Indicator[]
}

function ParallelLinePlot({selectedIndicators}: Props) {
  return (
      <div className="parallel-line-plot-container">
        <h1 className="title">Some title</h1>
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

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ParallelLinePlot);