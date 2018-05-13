import { LineRank } from '../state/observation/types';
import { Indicator } from '../state/indicator/types';

export const getRankingColor = (rank: LineRank): string => {
  return 'hsl(' + rank.color.h.toString() + ', '
    + rank.color.s.toString() + '%,'
    + rank.color.v.toString() + '%)';
};

export const getClassName = (indicator: Indicator, buttonType: string): string => {

  if (indicator.valuation === -1 && buttonType === 'negative') {
    return ' negative-selected'
  } else if (indicator.valuation === 1 && buttonType === 'negative') {
    return ' negative-unselected'
  } else if (indicator.valuation === 1 && buttonType === 'positive') {
    return ' positive-selected'
  } else if (indicator.valuation === -1 && buttonType === 'positive') {
    return ' positive-unselected'
  }
  return '';
};
