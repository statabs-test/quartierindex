import * as constants from './constants'

/**
 * Interface with payload
 */
export interface DoSomethingWithObservation {
  type: constants.OBSERVATION_UPDATE;
}

export type ObservationAction = DoSomethingWithObservation; // type with all interfaces, more with ||

/**
 * Actions with type and payload
 */
