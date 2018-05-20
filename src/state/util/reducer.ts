import { UtilAction } from './actions';
import { Util } from './types';
import { TOGGLE_SELECT_INDICATOR_VISIBILITY } from './constants';

const utilData = require('./../data/util.json');

/*
 * A reducer needs to be pure and side effect free
 * -> one solution is to implement a deep copy with the spread operator
* */

export function util(
    state: Util = utilData,
    action: UtilAction
): Util {

  switch (action.type) {
    case TOGGLE_SELECT_INDICATOR_VISIBILITY : {
      return {
        ...state,
        selectIndicatorConf: {
          visible: action.payload.visible
        }
      }
    }
  }

  return state;
}