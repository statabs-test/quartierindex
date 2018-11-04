import * as _ from 'lodash'
import { IndicatorAction } from './actions';
import { IndicatorState } from './types';
import { 
  INDICATOR_SELECT,
  INDICATOR_UPDATE,
  INDICATOR_VALUATION,
  INDICATOR_WEIGHT,
  INDICATOR_GROUP_SELECTION 
} from './constants';
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

function addIdToOrderedListById(orderedBySelection: string[], newId: string, oldId?: string) {
  // new id already in list
  if (orderedBySelection.indexOf(newId) > 0) {
    return [...orderedBySelection];
  }

  // no replace -> add at the end of the list
  if (!oldId) {
    return [...orderedBySelection, newId];
  }

  // check if oldId is really in our list
  if (orderedBySelection.indexOf(oldId) < 0) {
    return [...orderedBySelection, newId];
  }
  return orderedBySelection.map(id => id === oldId ? newId : id)
}

/**
 * Removes a specific id from the list of ordered indicator ids.
 * 
 * @param orderedBySelection list of ordered indicator ids
 * @param idToRemove the id we want to remove from the list
 */
function removeIdFromOrderedListById(orderedBySelection: string[], idToRemove: string) {
  return _.filter(orderedBySelection, id => id !== idToRemove);
}

function updateOrderedListById(orderedBySelection: string[], select: boolean, newId: string, oldId?: string) {
  if (select) {
    return addIdToOrderedListById(orderedBySelection, newId, oldId);
  }
  return removeIdFromOrderedListById(orderedBySelection, newId);
}

export function indicator(
  state: IndicatorState = { byId: arrayToObjectById(indicatorData), orderedBySelection: [] },
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
                },
                orderedBySelection: updateOrderedListById(
                  state.orderedBySelection,
                  action.payload.selected,
                  action.payload.id),
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
                },
                orderedBySelection: updateOrderedListById(
                  state.orderedBySelection,
                  action.payload.selected,
                  action.payload.id),
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
      case INDICATOR_GROUP_SELECTION:
        let toGroupIndicator = _.filter(state.byId, (indicat) => indicat.subject === action.payload.subject)
        let toggledIndicators = _.reduce(toGroupIndicator, (result, indicat) => {
            return {
              ...result, 
              [indicat.id]: {
                ...indicat, 
                selected: action.payload.selected
              }
            }
        }, {});
        return {
          ...state,
          byId: {
            ...state.byId,
            ...toggledIndicators
          }
        }
    }
    return state;
}