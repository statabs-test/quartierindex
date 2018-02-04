import * as constants from './constants'
import { NegativePositive } from './types'

/**
 * Select or deselect indicator interface with payload
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
      weight: number
    }
}

export interface SetValuation {
    type: constants.INDICATOR_VALUATION
    payload: {
        id: string
        valuation: NegativePositive
    }
}

/** Combine the three interfaces to one action */
export type IndicatorAction = IndicatorSelection | IndicatorUpdate | SetValuation;

/**
 * Select indicator for ranking
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
 * Select indicator for ranking
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
