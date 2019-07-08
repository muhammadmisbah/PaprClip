import { combineReducers } from 'redux';
import { snackReducer } from '@snack';

/* ============================================================================
  Combine ALl Reducers
============================================================================= */
const Reducer = combineReducers({
  Snack: snackReducer,
});

export const rootReducer = Reducer;
