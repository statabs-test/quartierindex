import * as React from 'react';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { LineRank } from '../../state/observation/types';
import { District } from '../../state/district/types';
import { allDistricts } from '../../state/district/selectors';
import { getLineRanking, getRankingDataForChart } from '../../state/observation/selectors';
import { getSelectedIndicators } from '../../state/indicator/selectors';
import { Indicator } from '../../state/indicator/types';
import { getRankingColor } from '../../helpers';
import { _highlightDistrict, _hideDistrict, _onHover, _offHover } from '../../state/district/actions';
import CustomDot from './plotElements/CustomDot';

export interface Props {
  districts: District[]
  rankingData: any[]
  lineRanking: LineRank[]
  selectedIndicators: Indicator[]

  highlightDistrict(id: string): void
  hideDistrict(id: string): void
  onHover(id: string): void
  offHover(id: string): void
}

const getColor = (lineRank: LineRank[], district: District): string => {
  const r = _.find(lineRank, rank => rank.objectId === district.id);
  if ((district.viewOptions.highlight || district.viewOptions.hover) && r) {
    return getRankingColor(r);
  } else {
    return '#A0A0A0'
  }
};

const getLineStroke = (district: District): number => {
  if ((district.viewOptions.highlight || district.viewOptions.hover)) {
    return 2;
  };
  return 1
};

const getParentWidth = (): number => {
  // const parent = document.getElementById('scroll-area');
  // console.log(parent);
  // If one could get the width of the parent div the plot are
  // could be resized reponsively
  // How do you calculate this value? Try!?
  return 730;
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

const parallelLinePlot = (props: Props) => {
  const { districts, rankingData, lineRanking, selectedIndicators,
    highlightDistrict, hideDistrict, onHover, offHover } = props;

  return (
    <ResponsiveContainer className="parallel-line-plot-chart" width={getWidth(selectedIndicators)} height={600}>
      <LineChart data={rankingData} height={600}>
        <CartesianGrid stroke="#d9d9d9" strokeDasharray="2" />
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
                strokeWidth={getLineStroke(d)}
                onClick={() => (d.viewOptions.highlight) ? hideDistrict(d.id) : highlightDistrict(d.id)}
                onMouseEnter={() => onHover(d.id)}
                onMouseLeave={() => offHover(d.id)}
                dot={<CustomDot
                  onHover={() => onHover(d.id)}
                  offHover={() => offHover(d.id)}
                  onClick={() => (d.viewOptions.highlight) ? hideDistrict(d.id) : highlightDistrict(d.id)}
                />}
              />
            ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

const barPlot = (props: Props) => {
  console.log(props.rankingData); 
  const data = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
  return (
  <div className="bar-plot-container">{props.rankingData.map(ranking =>
    (<div className="bar-plot">
    <BarChart layout="vertical" width={230} height={300} data={data}>
         <Bar dataKey="uv" fill="#8884d8"/>
       </BarChart>
    </div>))}</div>
  )
 
}

const ChartContainer = (props: Props) => {
  /*  if (!anyUserSelection) {
      lineRanking.slice(0, 3).forEach(r => _highlightDistrict(r.objectId, false))
    }*/
  if (false) {
    return parallelLinePlot(props);
  } else {
    return barPlot(props);
  }
};

const mapStateToProps = (state: Rootstate) => ({
  districts: allDistricts(state),
  selectedIndicators: getSelectedIndicators(state),
  rankingData: getRankingDataForChart(state),
  lineRanking: getLineRanking(state)

});

const mapDispatchToProps = ({
  highlightDistrict: _highlightDistrict,
  hideDistrict: _hideDistrict,
  onHover: _onHover,
  offHover: _offHover
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartContainer);