declare var window: Window & { devToolsExtension: any, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any};
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { indicator } from './indicator/reducer';
import { district } from './district/reducer';
import { IndicatorState as IndicatorState } from './indicator/types';
import { DistrictState } from './district/types';

export type Rootstate = {
    district: DistrictState,
    indicator: IndicatorState,
    // More reducer
}

const rootReducer = combineReducers<Rootstate>({
  district: district,
  indicator: indicator,
});

/* Plugin for chrome to see actions and how they effect changes in reducers */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
        // list middleware here

    )),
);
