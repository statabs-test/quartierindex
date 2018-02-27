import * as _ from 'lodash';
import { createSelector } from 'reselect'
import { Rootstate } from '../index';
import { getSelectedIndicators, getIndicator } from '../indicator/selectors';
import { Observation, Ranking } from './types';
import { Indicator } from '../indicator/types';

/**
 * Get all observations from state without any filter
 * @param {Rootstate} state
 * @returns { {[p: string]: Observation} } Observations listed byId
 */
const getObservations = (state: Rootstate) => {
    return state.observation.byId;
};

/**
 * Group observations by district
 * @returns { [districtId: string]: Observation[] }
 */
export const groupObservationsByDistrict = createSelector(
  [getObservations],
  (observations) => {
    return _.groupBy(observations, 'districtId');
});

/**
 * Calculate the average value of all observations with a reference to indicator
 * @param { Observation[] } observations of indicator or all observations
 * @param { Indicator } indicator to check if its related
 * @returns {number} floating point number of average
 */
export const getAverageValue = (observations: Observation[], indicator: Indicator) => {
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

/**
 * Same as getAverageValue with multiplication of valuation (-1 / +1) and weight (0.25 - 1)
 * @param {Observation[]} observations
 * @param {Indicator} indicator
 * @returns {number}
 */
export const getWeightedAverageValue = (observations: Observation[], indicator: Indicator) => {
  return getAverageValue(observations, indicator) * indicator.valuation * indicator.weight;
};

/**
 * Get weighted ranking with all selected indicators per district
 * @returns {Ranking[]} per district
 */
export const getGlobalRanking = createSelector(
  [getSelectedIndicators, groupObservationsByDistrict],
  (selectedIndicators, groupedByDistrict): Ranking[] => {
    if (selectedIndicators.length === 0) {
      return [];
    }

    // Get Ranking per District
    return _.map(groupedByDistrict, observations => {
      const total = _.reduce(selectedIndicators, (result, selectedIndicator, key) => {
        return result + getWeightedAverageValue(observations, selectedIndicator);
      }, 0);
      return {
        districtId: observations[0].districtId,
        value: (total / selectedIndicators.length),
      }
    });
  }
);

/**
 * Sorted weighted ranking with all selected indicators per district by value
 * @returns {Ranking[]} sorted ranking list
 */
export const getSortedGlobalRanking = createSelector(
  [getGlobalRanking],
  (globalRanking): Ranking[] => {
    return _.sortBy(globalRanking, 'value').reverse();
  }
);

/**
 * This function accepts an additional prop {id: IndicatorId}, see getIndicator
 * Returns an unweighted Ranking[] of the corresponding indicator
 * @returns {Ranking[]} sorted the same way as getSortedGlobalRanking
 */
export const makeGetIndicatorRanking = () => {
  return createSelector(
    [groupObservationsByDistrict, getSortedGlobalRanking, getIndicator],
    (groupedByDistrict, sortedRanking, indicator): Ranking[] => {
      // Get Ranking per District
      const rankings = _.map(groupedByDistrict, observations => {
        // Do not weight
        const total = getAverageValue(observations, indicator);

        return {
          districtId: observations[0].districtId,
          value: total,
        }
      });

      // Sort indicator rankings by sorted global ranking
      return _.sortBy(rankings, [function(ranking: Ranking) {
        return _.findIndex(sortedRanking, {'districtId': ranking.districtId});
      }]);
    }
  );
};
