import * as React from 'react';
import { LineRank } from '../../state/observation/types';
import LineRankItem from './LineRankItem';

export interface Props {
  ranking: LineRank[];
}

const LineRanking: React.StatelessComponent<Props> = ({ranking}) => {
  return (
      <svg className="line-ranking" overflow="visible">
        <line x1="10%" y1={0} x2="10%" y2="100%" stroke="grey" strokeWidth="2"/>

        {[0, 25, 75, 50, 100]
        .map(i => {
          const y = i + '%';
          const offset = 1;
          var xShift = 0;

          if (i === 0) {
            xShift = 6;
          } else if (i < 100) {
            xShift = 3;
          }

          return <g key={y}>
            <line
                x1="10%"
                y1={y}

                x2="79%"
                y2={y}

                stroke="grey"
                strokeWidth="1"
                stroke-dasharray="5, 5, 1, 5"
            />

            <text
                x={80 + xShift + '%'}
                y={100 - i + offset + '%'}
                floodColor="white"
                fill="grey"
            >
              {i + '%'}
            </text>
            <line
                x1="94%"
                y1={y}

                x2="100%"
                y2={y}

                stroke="grey"
                strokeWidth="1"
                stroke-dasharray="5, 5, 1, 5"
            />
          </g>;

        })
        }
        />
        {
          ranking
          .map((rank, index) => (
              <LineRankItem key={rank.objectId} rank={rank} rankIndex={index}/>))}
      </svg>
  );
};

export default LineRanking;