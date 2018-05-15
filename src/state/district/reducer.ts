import { DistrictAction } from './actions';
import { District, DistrictState } from './types';
import { DISTRICT_HIDE, DISTRICT_HIGHLIGHT } from './constants';

const districtData = require('./../data/district.json');
const arrayToObjectById = (array: District[]) =>
    array.reduce((obj, item) => {
      obj[item.id] = item
      return obj
    }, {})

/*
 * A reducer needs to be pure and side effect free
 * -> one solution is to implement a deep copy with the spread operator
* */

export function district(
    state: DistrictState = {byId: arrayToObjectById(districtData)},
    action: DistrictAction
): DistrictState {
  switch (action.type) {
    case DISTRICT_HIGHLIGHT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            viewOptions: {
              isSelected: action.payload.selection
            }
          }
        }

      };
    case DISTRICT_HIDE:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            viewOptions: {
              isSelected: action.payload.selection
          }
          }
        }

      };
  }
  return state;
}