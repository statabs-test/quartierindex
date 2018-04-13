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
      <LineChart width={600} height={600} data={rankingData}>
        {districts.map(
            d => (
                <Line key={d.id} type="monotone" dataKey={d.name} stroke={getColor(lineRanking, d)} activeDot={{r: 8}}/>
            ))}
        <XAxis dataKey="name"/>
      </LineChart>
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
