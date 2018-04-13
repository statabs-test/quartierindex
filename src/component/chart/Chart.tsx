import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { allDistricts } from '../../state/district/selectors';
import { District } from '../../state/district/types'
import { Line, LineChart, XAxis } from 'recharts';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { getRankingDataForChart } from '../../state/observation/selectors';

export interface Props {
  districts: District[]
  selectedIndicators: Indicator[]
  rankingData: any
}

function Chart({districts, selectedIndicators, rankingData}: Props) {
  return (
      <LineChart width={600} height={600} data={rankingData}>
        {districts.map(
            distrtict => (
                <Line key={distrtict.id} type="monotone" dataKey={distrtict.name} stroke="#8884d8" activeDot={{r: 8}}/>
            ))}
        <XAxis dataKey="name"/>
      </LineChart>
  );
}

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  selectedIndicators: getSelectedIndicators(state),
  rankingData: getRankingDataForChart(state)

});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
