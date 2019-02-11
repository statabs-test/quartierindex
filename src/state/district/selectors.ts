import * as _ from 'lodash'
import { Rootstate } from '../index'
import { District } from './types'

const select = (state: Rootstate) => {
  return state.district
}

/**
 * Selects all existing districts
 */
export const allDistricts = (state: Rootstate) => {
  return _.values(select(state).byId)
}

export const allDistrictsById = (state: Rootstate) => {
  return select(state).byId
}

/**
 * Get a district by name.
 * 
 * @param name the name of the district
 * @param state the state of the application
 */
export const districtByName = (name: string, state: Rootstate): District => {
  return allDistricts(state).filter(district => district.name === name)[0]
}

/**
 * Selects one district
 */
export const getDistrictBy = (districtId: string, state: Rootstate): District => {
  const success: District | undefined = allDistricts(state)
    .filter(district => district.id === districtId)
    .pop()

  if (success) {
    return success
  } else {
    throw new ReferenceError('Could not find district with id: ' + districtId)
  }
}
