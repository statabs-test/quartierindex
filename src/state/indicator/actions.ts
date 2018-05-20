import * as constants from './constants'
import { NegativePositive, WeightNumber } from './types'

/**
 * SelectIndicator or deselect indicator interface with payload
 */
export interface IndicatorSelection {
    type: constants.INDICATOR_SELECT
    payload: {
        id: string
        selected: boolean
    }
}

export interface IndicatorUpdate {
    type: constants.INDICATOR_UPDATE
    payload: {
      id: string
      selected: boolean
      valuation: NegativePositive
      weight: WeightNumber
    }
}

export interface SetValuation {
    type: constants.INDICATOR_VALUATION
    payload: {
        id: string
        valuation: NegativePositive
    }
}

export interface SetWeight {
  type: constants.INDICATOR_WEIGHT
  payload: {
    id: string
    weight: WeightNumber
  }
}

/** Combine the three interfaces to one action */
export type IndicatorAction = IndicatorSelection | IndicatorUpdate | SetValuation | SetWeight;

/**
 * SelectIndicator indicator for ranking
 * @param {string} id of indicator
 * @returns {IndicatorSelection}
 */
export function selectIndicator(id: string): IndicatorSelection {
    return {
        type: constants.INDICATOR_SELECT,
        payload: {
            id,
            selected: true,
        }
    };
}

/**
 * SelectIndicator indicator for ranking
 * @param {string} id of indicator
 * @returns {IndicatorSelection}
 */
export function deselectIndicator(id: string): IndicatorSelection {
    return {
        type: constants.INDICATOR_SELECT,
        payload: {
            id,
            selected: false,
        }
    };
}

/**
 * Set positiv valuation for ranking
 * @param {string} id of indicator
 * @returns {SetValuation}
 */
export function SetPositiveValuation(id: string): SetValuation {
    return {
        type: constants.INDICATOR_VALUATION,
        payload: {
            id,
            valuation: NegativePositive.Positive
        }
    }
}

/**
 * Set negative valuation for ranking
 * @param {string} id of indicator
 * @returns {SetValuation}
 */
export function SetNegativeValuation(id: string): SetValuation {
    return {
        type: constants.INDICATOR_VALUATION,
        payload: {
            id,
            valuation: NegativePositive.Negative
        }
    }
}

export function setWeight(id: string, weight: WeightNumber): SetWeight {
  return {
    type: constants.INDICATOR_WEIGHT,
    payload: {
      id,
      weight: weight
    }
  }
}
