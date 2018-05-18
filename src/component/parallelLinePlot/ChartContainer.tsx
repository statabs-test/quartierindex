import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from 'recharts';
import { LineRank } from '../../state/observation/types';
import { District } from '../../state/district/types';
import { allDistricts } from '../../state/district/selectors';
import { getLineRanking, getRankingDataForChart } from '../../state/observation/selectors';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { getRankingColor } from '../../helpers';
import { _highlightDistrict } from '../../state/district/actions';

export interface Props {
  districts: District[]
  rankingData: any
  lineRanking: LineRank[]
  selectedIndicators: Indicator[]

  highlightDistrict(id: string): void
}

const getColor = (lineRank: LineRank[], district: District): string => {
  const r = lineRank.find(rank => rank.objectId === district.id);
  if (district.viewOptions.isSelected && r) {
    return getRankingColor(r);
  } else {
    return '#A0A0A0'
  }
};

const getParentWidth = (): number => {
  // const parent = document.getElementById('scroll-area');
  // console.log(parent);
  // If one could get the width of the parent div the plot are
  // could be resized reponsively

  return 750;
};

const getWidth = (indicators: Indicator[]): number => {
  const maxIndicators = 3;
  const initScrollArea = getParentWidth();
  const widthOfElement = initScrollArea / maxIndicators;
  if (indicators.length === 1) {
    return 10;
  } else {
    return widthOfElement * (indicators.length - 1);
  }
};

const ChartContainer = ({districts, rankingData, lineRanking, selectedIndicators, highlightDistrict}: Props) => {
/*  if (!anyUserSelection) {
    lineRanking.slice(0, 3).forEach(r => _highlightDistrict(r.objectId, false))
  }*/

  return (
      <ResponsiveContainer width={getWidth(selectedIndicators)} height={600}>
        <LineChart className="parallel-line-plot-chart" data={rankingData} height={600}>
          <CartesianGrid stroke="#d9d9d9" strokeDasharray="2"/>
          {
            districts.map(
                d => (

                    <Line
                        /*dots disappearing https://github.com/recharts/recharts/issues/804*/
                        isAnimationActive={false}
                        key={d.id}
                        type="monotone"
                        dataKey={d.name}
                        stroke={getColor(lineRanking, d)}
                        activeDot={{r: 18}}
                        onClick={() => highlightDistrict(d.id)}
                    />
                ))}
        </LineChart>
      </ResponsiveContainer>
  )
};
const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  selectedIndicators: getSelectedIndicators(state),
  rankingData: getRankingDataForChart(state),
  lineRanking: getLineRanking(state)

});

const mapDispatchToProps = ({
 highlightDistrict: _highlightDistrict
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);
