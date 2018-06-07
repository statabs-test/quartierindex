import * as React from 'react';
import { LineRank } from '../../state/observation/types';
import { getRankingColor, getLineStroke } from '../../helpers';

export interface Props {
  rank: LineRank;
  rankIndex: number;

  onClick(): void;

  onMouseEnter(): void;

  onMouseLeave(): void;
}

const y = (yPos: number): string => {
  const yy = (1 - yPos) * 100;
  return yy.toString() + '%';
};

const labelPos = (rankIndex: number): string =>
    ((1 - 0.9 * (1 - rankIndex / 21)) * 100).toString() + '%';

const getRankingFontWeight = (rank: LineRank): React.CSSProperties => {
    if (rank.highlighted || rank.hover) {
        return {fontWeight: 'bold'};
    }
    return {fontWeight: 400};
}
const LineRankItem: React.StatelessComponent<Props> =
    ({rank, rankIndex, onClick, onMouseEnter, onMouseLeave}) => {
      return (
          <g
              onClick={() => onClick()}
              onMouseEnter={() => onMouseEnter()}
              onMouseLeave={() => onMouseLeave()}
          >

            <circle
                cx="10%"
                cy={y(rank.rankValue)}

                r={4}
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
                strokeWidth={getLineStroke(rank)}
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
                strokeWidth={getLineStroke(rank)}
            />

            <text
                x="30%"
                y={labelPos(rankIndex)}

                fill={getRankingColor(rank)}
            >
            <tspan style={getRankingFontWeight(rank)}>
              {rankIndex + 1}
            </tspan>  
            </text>
            <text
                x="38%"
                y={labelPos(rankIndex)}

                fill={getRankingColor(rank)}
            >
            <tspan style={getRankingFontWeight(rank)}>
              {rank.labelText}
              </tspan>
            </text>
          </g>
      );

    };

export default LineRankItem;
