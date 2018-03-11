import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import RankingItem from './RankingItem';
import { LineRankI } from '../../state/observation/types';

export interface Props {
  ranking: LineRankI[];

}

function LineRanking({ranking}: Props) {
  return (
      <div>
        <h1>Line Ranking</h1>
        <svg className="ranking-container">
          <line x1="50%" y1={0} x2="50%" y2="100%" stroke="green" stroke-width="2"/>
          {
            ranking.map((rank, index) => (<RankingItem test={rank.rankValue}/>))}
        </svg>
      </div>
  );
}

const mapStateToProps = (state: Rootstate, ownProps: { ranking: LineRankI[] }) => ({
  ranking: ownProps.ranking
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LineRanking);