import * as _ from 'lodash';
import { Rootstate } from '../index';
import { getSelectedIndicators } from '../indicator/selectors';
import { Observation, Ranking } from './types';
import { Indicator } from '../indicator/types';

const select = (state: Rootstate) => {
    return state.observation.byId;
};

/**
 * Selects all existing districts
 */
export const allObservations = (state: Rootstate) => {
    return _.values(select(state));
};

export const groupObservationsByDistrict = (state: Rootstate) => {
    return _.groupBy(select(state), 'districtId');
};

export const getMedianValue = (observations: Observation[], indicator: Indicator) => {
  let cnt = 0;
  // Sum all observations with indicator
  const total = _.reduce(observations, (result, observation, key) => {
    if (observation.indicatorId === indicator.id) {
      cnt = cnt + 1;
      return result + observation.normValue
    }
    return result;
  }, 0);
  if (cnt === 0) {
    return total;
  }
  return (total / cnt);
};

export const getWeightedMedianValue = (observations: Observation[], indicator: Indicator) => {
  return getMedianValue(observations, indicator) * indicator.valuation * indicator.weight;
};

export const getIndicatorRanking = (state: Rootstate, indicator: Indicator): Ranking[] => {
  const groupedByDistrict = groupObservationsByDistrict(state);

  // Get Ranking per District
  return _.map(groupedByDistrict, observations => {
    const total = getMedianValue(observations, indicator);

    return {
      districtId: observations[0].districtId,
      value: total,
    }
  });
};

export const getGlobalRanking = (state: Rootstate): Ranking[] => {
  // Retrieve selectedIndicators
  const selectedIndicators = getSelectedIndicators(state);
  if (selectedIndicators.length === 0) {
    return [];
  }
  // Retrieve groupedByDistrict observations
  const groupedByDistrict = groupObservationsByDistrict(state);

  // Get Ranking per District
  return _.map(groupedByDistrict, observations => {
    const total = _.reduce(selectedIndicators, (result, selectedIndicator, key) => {
      return result + getWeightedMedianValue(observations, selectedIndicator);
    }, 0);
    return {
      districtId: observations[0].districtId,
      value: (total / selectedIndicators.length),
    }
  });
};

export const getSortedGlobalRanking = (state: Rootstate): Ranking[] => {
  return _.sortBy(
    getGlobalRanking(state),
    'value'
  ).reverse();
};

/*
 * Todo: Refactor to memoize results of selector with reselect for performance gain
 */
