import { ObservationAction } from './actions';
import { Observation, ObservationState } from './types';
import {  } from './constants';

const observationData = require('./../data/observation.json');
const arrayToObjectById = (array: Observation[]) =>
  array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})

/*
 * A reducer needs to be pure and side effect free
 * -> one solution is to implement a deep copy with the spread operator
* */
export function observation(
  state: ObservationState = { byId: arrayToObjectById(observationData)},
  action: ObservationAction
): ObservationState {
    switch (action.type) {

    }
    return state;
}