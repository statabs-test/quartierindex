import * as constants from './constants'

/**
 * Interface with payload
 */
export interface ToggleIndicatorSelectionVisibility {
  type: constants.TOGGLE_SELECT_INDICATOR_VISIBILITY;
  payload: {
    visible: boolean
  }
}

export type UtilAction = ToggleIndicatorSelectionVisibility; // type with all interfaces, more with ||

/**
 * Actions with type and payload
 */
export const toggleIndicatorSelectionVisibility = (currentVisibility: boolean)
    : ToggleIndicatorSelectionVisibility => (
    {
      type: constants.TOGGLE_SELECT_INDICATOR_VISIBILITY,
      payload: {
        visible: !currentVisibility
      }
    }
);
