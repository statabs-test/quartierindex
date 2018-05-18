import { DistrictAction } from './actions';
import { District, DistrictState } from './types';
import {
  DISTRICT_HIDE,
  DISTRICT_HIGHLIGHT,
  DISTRICT_OFF_HOVER,
  DISTRICT_ON_HOVER
} from './constants';

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
              highlight: action.payload.highlight,
              hover: state.byId[action.payload.id].viewOptions.hover
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
              highlight: action.payload.highlight,
              hover: state.byId[action.payload.id].viewOptions.hover
            }
          }
        }

      };

    case DISTRICT_OFF_HOVER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            viewOptions: {
              hover: action.payload.hover,
              highlight: state.byId[action.payload.id].viewOptions.highlight
            }
          }
        }

      };
    case DISTRICT_ON_HOVER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            viewOptions: {
              hover: action.payload.hover,
              highlight: state.byId[action.payload.id].viewOptions.highlight
            }
          }
        }

      };
  }
  return state;
}