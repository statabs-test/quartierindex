import { LineRank } from '../state/observation/types';

export const getRankingColor = (rank: LineRank): string => {
  return 'hsl(' + rank.color.h.toString() + ', '
    + rank.color.s.toString() + '%,'
    + rank.color.v.toString() + '%)';
};