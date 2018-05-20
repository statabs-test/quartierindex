import * as React from 'react';
import { LineRank } from '../../state/observation/types';
import LineRankItem from './LineRankItem';
import { Rootstate } from '../../state';
import { connect } from 'react-redux';
import { getLineRanking } from '../../state/observation/selectors';
import {
  _hideDistrict,
  _highlightDistrict,
  _offHover,
  _onHover
} from '../../state/district/actions';

export interface Props {
  ranking: LineRank[];

  highlightDistrict(id: string): void
  hideDistrict(id: string): void
  onHover(id: string): void
  offHover(id: string): void
}

const LineRanking = ({ranking, highlightDistrict, hideDistrict, offHover, onHover}: Props) => {
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
              <LineRankItem
                  key={rank.objectId}
                  rank={rank}
                  rankIndex={index}
                  onClick={() =>
                      (rank.highlighted) ?
                          hideDistrict(rank.objectId)
                          : highlightDistrict(rank.objectId)}
                  onMouseEnter={() => onHover(rank.objectId)}
                  onMouseLeave={() => offHover(rank.objectId)}
              />
          ))}
      </svg>
  );
};

const mapStateToProps = (state: Rootstate) => ({
  ranking: getLineRanking(state)
});

const mapDispatchToProps = ({
  highlightDistrict: _highlightDistrict,
  hideDistrict: _hideDistrict,
  onHover: _onHover,
  offHover: _offHover
});

export default connect(mapStateToProps, mapDispatchToProps)(LineRanking);
