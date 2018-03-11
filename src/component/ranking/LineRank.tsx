import * as React from 'react';
import { LineRankI } from '../../state/observation/types';
import { Rootstate } from '../../state';
import { connect } from 'react-redux';

export interface Props {
  rank: LineRankI;
  rankIndex: number;
}

const y = (yPos: number): string => {
  const yy = yPos * 100;
  return yy.toString() + '%';
};

const labelPos = (rankIndex: number): string =>
    (0.9 * (1 - rankIndex / 21) * 100).toString() + '%';

const LineRank = ({rank, rankIndex}: Props) => {
  return (
      <g>
        <line x1="50%" x2="58%" y1={y(rank.rankValue)} y2={y(rank.rankValue)} stroke="green"/>
        <line x1="58%" x2="70%" y1={y(rank.rankValue)} y2={labelPos(rankIndex)} stroke="green"/>
        <circle cx="50%" cy={y(rank.rankValue)} r={10} stroke="red"/>
        <text x="70%" y={labelPos(rankIndex)} stroke="red">{rank.labelText}</text>
      </g>
  );
};

const mapStateToProps = (state: Rootstate, ownProps: { rank: LineRankI, rankIndex: number }) => ({
  rank: ownProps.rank,
  rankIndex: ownProps.rankIndex
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(LineRank);