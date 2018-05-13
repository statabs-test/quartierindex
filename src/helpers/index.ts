import { LineRank } from '../state/observation/types';
import { Indicator, NegativePositive } from '../state/indicator/types';

export const getRankingColor = (rank: LineRank): string => {
  return 'hsl(' + rank.color.h.toString() + ', '
      + rank.color.s.toString() + '%,'
      + rank.color.v.toString() + '%)';
};

export const getClassNameSelectedUnselected = (indicator: Indicator, buttonType: string): string => {

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

export const getClassNameNegPosBorder = (indicator: Indicator): string => {
  switch (indicator.valuation) {
    case NegativePositive.Negative:
      return ' negative-border ';
    case NegativePositive.Positive:
      return ' positive-border ';
    default:
      return '';
  }
};

export const getClassNameNegPos = (indicator: Indicator): string => {
  switch (indicator.valuation) {
    case NegativePositive.Negative:
      return ' negative ';
    case NegativePositive.Positive:
      return ' positive ';
    default:
      return '';
  }
};
