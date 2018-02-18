import * as _ from 'lodash';
import { Rootstate } from '../index';
import { selectedIndicators } from '../indicator/selectors';

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
}

/*
 * Todo: Continue to implement ranking function
 * Todo: Refactor to memoize results of selector with reselect for performance gain
 */
export const calculatedRankingByDistrictOverall = (state: Rootstate) => {
  const groupedByDistrict = groupObservationsByDistrict(state);
  const selectedIndicator = selectedIndicators(state);
  // const indicatorCnt = allIndicators(state).length;

  return _.sortBy(
    _.map(groupedByDistrict, observations => {

    const observationTotal = _.reduce(observations, (result, observation, key) => {
      let indicator = _.find(selectedIndicator, {'id': observation.indicatorId});
      if (indicator) {
        return result + observation.normValue * indicator.valuation * indicator.weight;
      }
      return result;
    }, 0)

    return {
      districtId: observations[0].districtId,
      value: (observationTotal / selectedIndicator.length),
    }
  }), 'value').reverse() ;
}
