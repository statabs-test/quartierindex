import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
import { LineRank } from '../../state/observation/types';
import { District } from '../../state/district/types';
import { allDistricts } from '../../state/district/selectors';
import { getLineRanking, getRankingDataForChart } from '../../state/observation/selectors';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';

export interface Props {
  districts: District[]
  rankingData: any
  lineRanking: LineRank[]
  selectedIndicators: Indicator[]
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

const getWidth = (indicators: Indicator[]): number => {
  const maxIndicators = 3;
  const initScrollArea = 750;
  const widthOfElement = initScrollArea / maxIndicators;
  if (indicators.length ===  1) {
    return 10;
  } else {
    return widthOfElement * (indicators.length - 1);
  }
};

const LegendContainer = ({districts, rankingData, lineRanking, selectedIndicators}: Props) =>
    (
     <ResponsiveContainer width={getWidth(selectedIndicators)} height={600} >
        <LineChart className="parallel-line-plot-chart" data={rankingData}>
      {districts.map(
          d => (
              <Line key={d.id} type="monotone" dataKey={d.name} stroke={getColor(lineRanking, d)} activeDot={{r: 8}}/>
          ))}
    </LineChart>
     </ResponsiveContainer>
    );

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  selectedIndicators: getSelectedIndicators(state),
  rankingData: getRankingDataForChart(state),
  lineRanking: getLineRanking(state)

});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LegendContainer);
