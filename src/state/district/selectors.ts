import * as _ from 'lodash';
import { Rootstate } from '../index';

const select = (state: Rootstate) => {
    return state.district;
};

/**
 * Selects all existing districts
 */
export const allDistricts = (state: Rootstate) => {
    return _.values(select(state).byId);
};
