import * as constants from './constants'

/**
 * Interface with payload
 */
export interface DoSomehtingWithDistrict {
  type: constants.DISTRICT_UPDATE;
}

export type DistrictAction = DoSomehtingWithDistrict; // type with all interfaces, more with ||

/**
 * Actions with type and payload
 */
