import { DistrictAction } from './actions';
import { District, DistrictState } from './types';
import {  } from './constants';

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
  state: DistrictState = { byId: arrayToObjectById(districtData)},
  action: DistrictAction
): DistrictState {
    switch (action.type) {

    }
    return state;
}