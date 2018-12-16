import { Rootstate } from '../index';

const select = (state: Rootstate)  => {
  return state.util;
};

/**
 * Selects Util
 */
export const getUtil = (state: Rootstate) => {
  return select(state);
};

export const getDisclaimer = (state: Rootstate) => {
  return state.util.disclaimer;
}