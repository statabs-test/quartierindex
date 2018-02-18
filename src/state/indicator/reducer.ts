import { IndicatorAction } from './actions';
import { IndicatorState } from './types';
import { INDICATOR_SELECT, INDICATOR_UPDATE, INDICATOR_VALUATION, INDICATOR_WEIGHT } from './constants';
import { Indicator } from './types'

const indicatorData = require('./../data/indicator.json');
const arrayToObjectById = (array: Indicator[]) =>
  array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})

/*
 * A reducer needs to be pure and side effect free
 * -> one solution is to implement a deep copy with the spread operator
* */

export function indicator(
  state: IndicatorState = { byId: arrayToObjectById(indicatorData) },
  action: IndicatorAction): IndicatorState {
    switch (action.type) {
        /*
         * Updates all information based on the user selection, see storeState for shape
         */
      case INDICATOR_UPDATE:
          return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                      ...state.byId[action.payload.id],
                      ...action.payload
                    },
                }
            };

        /*
         * Sets the selection with the
         */
        case INDICATOR_SELECT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        ...action.payload
                    }
                }
            };
        /*
         * Valuation
         */
        case INDICATOR_VALUATION: {
          return {
            ...state,
            byId: {
              ...state.byId,
              [action.payload.id]: {
                ...state.byId[action.payload.id],
                ...action.payload
              }
            }
          };
        }

        /*
         * Weight
         */
      case INDICATOR_WEIGHT:
        return {
          ...state,
          byId: {
            ...state.byId,
            [action.payload.id]: {
              ...state.byId[action.payload.id],
              ...action.payload
            }
          }
        }
    }
    return state;
}