import * as React from 'react';
import { LineRank } from '../../state/observation/types';
import LineRankItem from './LineRankItem';

export interface Props {
  ranking: LineRank[];

}

const LineRanking: React.StatelessComponent<Props> = ({ ranking }) => {
  return (
        <svg className="line-ranking">
          <line x1="10%" y1={0} x2="10%" y2="100%" stroke="grey" strokeWidth="2"/>
          {
            ranking
            .map((rank, index) => (<LineRankItem key={rank.objectId} rank={rank} rankIndex={index}/>))}
        </svg>
  );
};

export default LineRanking;