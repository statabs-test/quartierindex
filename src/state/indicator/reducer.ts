import { IncrementAction } from './actions';
import { StoreState } from './types';
import { INDICATOR_SELECT, INDICATOR_UPDATE } from './constants';
import { dummyDataIndicator } from '../dummyData';

/*
 * A reducer needs to be pure and side effect free
 * -> one solution is to implement a deep copy with the spread operator
* */

export function indicator(state: StoreState = dummyDataIndicator, action: IncrementAction): StoreState {
    switch (action.type) {
        /*
         * Updates all information based on the user selection, see storeState for shape
         */
        case INDICATOR_UPDATE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...action.payload
                    },
                }
            };

        /*
         * Sets the selection with the
         */
        case INDICATOR_SELECT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...state.byId[action.payload.id],
                        ...action.payload
                    }
                }
            };
    }
    return state;
}