import * as constants from './constants'

/**
 * Interface with payload
 */
export interface DoSomehtingWithDistrict {
  type: constants.DISTRICT_UPDATE;
}

export interface HighlightDistrict {
  type: constants.DISTRICT_HIGHLIGHT
  payload: {
    id: string
    selection: boolean
  }

}

export interface HideDistrict {
  type: constants.DISTRICT_HIDE
  payload: {
    id: string
    selection: boolean
  }

}

export type DistrictAction = (DoSomehtingWithDistrict | HighlightDistrict | HideDistrict);
// type with all interfaces, more with ||

/**
 * Actions with type and payload
 */

export const _highlightDistrict = (id: string)
    : HighlightDistrict =>
    ({
      type: constants.DISTRICT_HIGHLIGHT,
      payload: {
        id: id,
        selection: true
      }
    });

export const _hideDistrict = (id: string)
    : HideDistrict =>
    ({
      type: constants.DISTRICT_HIDE,
      payload: {
        id: id,
        selection: false
      }
    });
