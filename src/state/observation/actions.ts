import * as constants from './constants'

/**
 * Interface with payload
 */
export interface DoSomehtingWithObservation {
  type: constants.OBSERVATION_UPDATE;
}

export type ObservationAction = DoSomehtingWithObservation; // type with all interfaces, more with ||

/**
 * Actions with type and payload
 */
