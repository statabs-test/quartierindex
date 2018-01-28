declare var window: Window & { devToolsExtension: any, __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any};
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { indicator } from './indicator/reducer';
import { StoreState as IndicatorState } from './indicator/types';

export type Rootstate = {
    indicator: IndicatorState,
    // More reducer
}

const rootReducer = combineReducers<Rootstate>({
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
