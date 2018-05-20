import * as _ from 'lodash';
import { Rootstate } from '../index';
import { District } from './types';

const select = (state: Rootstate) => {
  return state.district;
};

/**
 * Selects all existing districts
 */
export const allDistricts = (state: Rootstate) => {
  return _.values(select(state).byId);
};

/**
 * Selects one district
 */
export const getDistrictBy = (districtId: string, state: Rootstate): District => {
  const success: District | undefined = allDistricts(state).filter(
      district => district.id === districtId
  ).pop();

  if (success) {
    return success;
  } else {
    throw new ReferenceError('Could not find district with id: ' + districtId);

  }
};