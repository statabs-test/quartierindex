import * as _ from 'lodash';
import { createSelector } from 'reselect'
import { Rootstate } from '../index';
import { getIndicator, getSelectedIndicators } from '../indicator/selectors';
import { Color, LineRank, Observation, Rank } from './types';
import { Indicator } from '../indicator/types';
import { getDistrictBy } from '../district/selectors';

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
 * Same as getAverageValue with multiplication and weight (0.25 - 1)
 * if valuation -1 subtraction of weighted average from 1
 * @param {Observation[]} observations
 * @param {Indicator} indicator
 * @returns {number}
 */
export const getWeightedAverageValue = (observations: Observation[], indicator: Indicator) => {
  return indicator.valuation === 1 ?
      getAverageValue(observations, indicator) * indicator.weight
      : 1 - getAverageValue(observations, indicator) * indicator.weight;
};

/**
 * Get weighted ranking with all selected indicators per district
 * @returns {Rank[]} per district
 */
export const getGlobalRanking = createSelector(
    [getSelectedIndicators, groupObservationsByDistrict],
    (selectedIndicators, groupedByDistrict): Rank[] => {
      if (selectedIndicators.length === 0) {
        return [];
      }

      // Get Rank per Util
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
 * @returns {Rank[]} sorted ranking list
 */
export const getSortedGlobalRanking = createSelector(
    [getGlobalRanking],
    (globalRanking): Rank[] => {
      return _.sortBy(globalRanking, 'value').reverse();
    }
);

/**
 * This function accepts an additional prop {id: IndicatorId}, see getIndicator
 * Returns a weighted Rank[] of the corresponding indicator
 * @returns {Rank[]} sorted the same way as getSortedGlobalRanking
 */
export const makeGetIndicatorRanking = () => {
  return createSelector(
      [groupObservationsByDistrict, getSortedGlobalRanking, getIndicator],
      (groupedByDistrict, sortedRanking, indicator): Rank[] => {
        // Get Rank per Util
        const rankings = _.map(groupedByDistrict, observations => {
          // Do weight
          const total = getWeightedAverageValue(observations, indicator);

          return {
            districtId: observations[0].districtId,
            value: total,
          }
        });

        // Sort indicator rankings by sorted global ranking
        return _.sortBy(rankings, [function (ranking: Rank) {
          return _.findIndex(sortedRanking, {'districtId': ranking.districtId});
        }]);
      }
  );
};

/**
 * Maps quartierindex data model to Rechart data model
 * @param {{indicator: Indicator; districtRank: Rank[]}} indicatorRanking
 * @param {Rootstate} state
 * @returns {{name: string, indicatorName1: number, indicatorName2: number, ..., indicatorNameN}[]}
 */
const mapToRechartsDataModel =
    (indicatorRanking: { indicator: Indicator; districtRank: Rank[] }, state: Rootstate) => {
      const dataModel = {name: indicatorRanking.indicator.name};

      indicatorRanking.districtRank.forEach(
          districtIdAndRankValue => {
            const districtName =
                getDistrictBy(
                    districtIdAndRankValue.districtId,
                    state).name;

            dataModel[districtName] = districtIdAndRankValue.value
          });
      return dataModel
    };

/**
 * Returns the ranking as it is required by Recharts
 * the rank of all selected indicators will be retrieved
 * @param {Rootstate} state
 * @returns {{name: string, indicatorName1: number, indicatorName2: number, ..., indicatorNameN}[]}
 */
export const getRankingDataForChart = (state: Rootstate) => {
  const selectedIndicators = getSelectedIndicators(state);
  const getIndicatorRanking = makeGetIndicatorRanking();

  const indicatorRanking =
      selectedIndicators
      .map(indicator =>
          ({
            indicator: indicator,
            districtRank: getIndicatorRanking(state, {id: indicator.id})
          })
      )
      .map(r => mapToRechartsDataModel(r, state));

  return indicatorRanking;
};

const toLineRank = (rank: Rank, state: Rootstate): LineRank => {
  const green: Color = {h: 128, s: 80 * rank.value, v: 50};
  const red: Color = {h: 348, s: 95 * (1 - rank.value), v: 50};
  const color: Color = rank.value > 0.5 ? green : red;

  const lineRank: LineRank = {
    objectId: rank.districtId,
    labelText: getDistrictBy(rank.districtId, state).name,
    rankValue: rank.value,
    color: color,
    highlighted: getDistrictBy(rank.districtId, state).viewOptions.highlight,
    hover: getDistrictBy(rank.districtId, state).viewOptions.hover
  };

  return lineRank;
};

export const getLineRanking = (state: Rootstate) =>
    getSortedGlobalRanking(state).map(rank => toLineRank(rank, state));
