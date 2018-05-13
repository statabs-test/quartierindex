import * as React from 'react';
import { LineRank } from '../../state/observation/types';
import { getRankingColor } from '../../helpers';

export interface Props {
  rank: LineRank;
  rankIndex: number;
}

const y = (yPos: number): string => {
  const yy = (1 - yPos) * 100;
  return yy.toString() + '%';
};

const labelPos = (rankIndex: number): string =>
    ((1 - 0.9 * (1 - rankIndex / 21)) * 100).toString() + '%';

const LineRankItem: React.StatelessComponent<Props> = ({rank, rankIndex}) => {
  return (
      <g>

        <circle
            cx="10%"
            cy={y(rank.rankValue)}

            r={10}
            fill={getRankingColor(rank)}
        />

        /**
        * Horizontal line
        */
        <line
            x1="10%"
            y1={y(rank.rankValue)}

            x2="18%"
            y2={y(rank.rankValue)}

            stroke={getRankingColor(rank)}
        />

        /**
        * Line to Text
        */
        <line
            x1="18%"
            y1={y(rank.rankValue)}

            x2="30%"
            y2={labelPos(rankIndex)}

            stroke={getRankingColor(rank)}
            strokeWidth="1"
        />

        <text
            x="30%"
            y={labelPos(rankIndex)}

            fill={getRankingColor(rank)}
        >
          {rank.labelText}
        </text>
      </g>
  );

};

export default LineRankItem;
