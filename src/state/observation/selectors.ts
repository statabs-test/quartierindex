import * as _ from 'lodash';
import { Rootstate } from '../index';
import { allIndicators } from '../indicator/selectors';

const select = (state: Rootstate) => {
    return state.observation;
};

// Observations between 0 and 1, use per indicator
const normalizeValue = (val: number, max: number, min: number): number =>  {
    return (val - min) / (max - min);
}

/**
 * Selects all existing districts
 */
export const allObservations = (state: Rootstate) => {
    return _.values(select(state).byId);
};

export const groupObservationsByIndicator = (state: Rootstate) => {
  return _.groupBy(allObservations(state), 'indicatorId');
}

export const normalizeObservation = (state: Rootstate) => {
    return _.flatten(
      _.map(groupObservationsByIndicator(state), (observations) => {
        const max = _.maxBy(observations, 'value');
        const min = _.minBy(observations, 'value');

        return _.map(observations, observation => {
          return {
            ...observation,
            value: normalizeValue(observation.value, max ? max.value : 1, min ? min.value : 0)
          };
        });
      })
    )
}

export const groupObservationsByDistrict = (state: Rootstate) => {
    return _.groupBy(normalizeObservation(state), 'districtId');
}

/*
 * Todo: Continue to implement ranking function
 * Todo: Refactor to memoize results of selector with reselect for performance gain
 */
export const calculatedRankingByDistrictOverall = (state: Rootstate) => {
    const groupedByDistrict = groupObservationsByDistrict(state);
    // const selectedIndicator = selectedIndicators(state);
    const indicatorCnt = allIndicators(state).length;

    return _.map(groupedByDistrict, observations => {

        const observationTotal = _.reduce(observations, (result, observation, key) => {
          return result + observation.value;
        }, 0)

        return {
          districtId: observations[0].districtId,
          value: (observationTotal / indicatorCnt),
        }
    });
}
