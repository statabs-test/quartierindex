import * as _ from 'lodash';
import { Rootstate } from '../index';

const select = (state: Rootstate) => {
    return state.indicator;
};

/**
 * Selects all existing indicator
 */
export const allIndicators = (state: Rootstate) => {
    return _.values(select(state).byId);
};
