import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { allDistricts } from '../../state/district/selectors';
import { District } from '../../state/district/types'
import { Line, LineChart, XAxis } from 'recharts';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { getLineRanking, getRankingDataForChart } from '../../state/observation/selectors';
import { LineRank } from '../../state/observation/types';

export interface Props {
  districts: District[]
  selectedIndicators: Indicator[]
  rankingData: any
  lineRanking: LineRank[]
}

const colorToString = (rank: LineRank): string =>
    'hsl(' + rank.color.h.toString() + ', '
    + rank.color.s.toString() + '%,'
    + rank.color.v.toString() + '%)';

const getColor = (lineRank: LineRank[], district: District): string => {
  const r = lineRank.find(rank => rank.objectId === district.id);
  if (r) {
    return colorToString(r);
  } else {
    return '#A0A0A0'
  }
};

function Chart({districts, selectedIndicators, rankingData, lineRanking}: Props) {
  return (
      <div className="parallel-line-plot-container">
        <h1 className="title">Some title</h1>
        <div className="parallel-line-plot-scroll-area">
          <div className="parallel-line-plot-legend">
            legend of selected indicator corresponding to chart ... react component must be created
            <p>
              if more than 3 indicators are selected the chart width must be changed by
            </p>
            width = selectedInicatorsSize * 650/3
          </div>
          <LineChart className="parallel-line-plot-chart" width={650} height={630} data={rankingData}>
          {districts.map(
            d => (
                <Line key={d.id} type="monotone" dataKey={d.name} stroke={getColor(lineRanking, d)} activeDot={{r: 8}}/>
            ))}
          <XAxis dataKey="name"/>
        </LineChart>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
