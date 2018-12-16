import * as _ from 'lodash'
import { Rootstate } from '../index'
import { Indicator } from './types'
// import { indicator } from './reducer';

const select = (state: Rootstate) => {
  return state.indicator
}

/**
 * Selects all existing indicator
 */
export const allIndicators = (state: Rootstate): Indicator[] => {
  return _.values(select(state).byId)
}

export const getIndicator = (state: Rootstate, props: { id: string }): Indicator => {
  return select(state).byId[props.id]
}

export const getGroupedIndicators = (state: Rootstate): { [key: string]: Indicator[] } => {
  return _.groupBy(_.sortBy(allIndicators(state), 'name'), indicator => indicator.subject)
}

/**
 * SelectIndicator all selected indicator
 */
export const getSelectedIndicators = (state: Rootstate): Indicator[] => {
  const selectedIndicatorIndexes = state.indicator.orderedBySelection
  return _.map(selectedIndicatorIndexes, selectedId => {
    return state.indicator.byId[selectedId]
  })
}

/**
 * Get choosable indicators (Selector for dropdown in diagram)
 */
export const getChoosableIndicators = (state: Rootstate): Indicator[] => {
  const indicators = allIndicators(state)
  return indicators.filter(indicator => !indicator.selected)
}
