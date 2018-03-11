import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import LineRank from './LineRank';
import { LineRankI } from '../../state/observation/types';

export interface Props {
  ranking: LineRankI[];

}

const LineRanking = ({ranking}: Props) => {
  return (
      <div>
        <h1>Line Ranking</h1>
        <svg className="ranking-container">
          <line x1="10%" y1={0} x2="10%" y2="100%" stroke="grey" stroke-width="2"/>
          {
            ranking
            .map((rank, index) => (<LineRank rank={rank} rankIndex={index}/>))}
        </svg>
      </div>
  );
}

const mapStateToProps = (state: Rootstate, ownProps: { ranking: LineRankI[] }) => ({
  ranking: ownProps.ranking
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LineRanking);