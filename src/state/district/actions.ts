import * as constants from './constants'

/**
 * Interface with payload
 */
export interface DoSomehtingWithDistrict {
  type: constants.DISTRICT_UPDATE
}

export interface HighlightDistrict {
  type: constants.DISTRICT_HIGHLIGHT
  payload: {
    id: string
    highlight: boolean
  }
}

export interface HideDistrict {
  type: constants.DISTRICT_HIDE
  payload: {
    id: string
    highlight: boolean
  }
}

export interface OnHover {
  type: constants.DISTRICT_ON_HOVER
  payload: {
    id: string
    hover: boolean
  }
}

export interface OffHover {
  type: constants.DISTRICT_OFF_HOVER
  payload: {
    id: string
    hover: boolean
  }
}

export type DistrictAction =
  | DoSomehtingWithDistrict
  | HighlightDistrict
  | HideDistrict
  | OnHover
  | OffHover
// type with all interfaces, more with ||

/**
 * Actions with type and payload
 */

export const _highlightDistrict = (id: string): HighlightDistrict => ({
  type: constants.DISTRICT_HIGHLIGHT,
  payload: {
    id: id,
    highlight: true,
  },
})

export const _hideDistrict = (id: string): HideDistrict => ({
  type: constants.DISTRICT_HIDE,
  payload: {
    id: id,
    highlight: false,
  },
})

export const _onHover = (id: string): OnHover => ({
  type: constants.DISTRICT_ON_HOVER,
  payload: {
    id: id,
    hover: true,
  },
})

export const _offHover = (id: string): OffHover => ({
  type: constants.DISTRICT_OFF_HOVER,
  payload: {
    id: id,
    hover: false,
  },
})
