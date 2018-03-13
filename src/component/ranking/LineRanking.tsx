import * as React from 'react';
import { connect } from 'react-redux';
import { Rootstate } from '../../state';
import { LineRank } from '../../state/observation/types';
import LineRankItem from './LineRankItem';

export interface Props {
  ranking: LineRank[];

}

const LineRanking = ({ranking}: Props) => {
  return (
      <div>
        <h1>Line Ranking</h1>
        <svg className="ranking-container">
          <line x1="10%" y1={0} x2="10%" y2="100%" stroke="grey" stroke-width="2"/>
          {
            ranking
            .map((rank, index) => (<LineRankItem rank={rank} rankIndex={index}/>))}
        </svg>
      </div>
  );
}

const mapStateToProps = (state: Rootstate, ownProps: { ranking: LineRank[] }) => ({
  ranking: ownProps.ranking
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LineRanking);