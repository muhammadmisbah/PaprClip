import { combineReducers } from 'redux';
import { authReducer } from '@auth';
import { snackReducer } from '@snack';

/* ============================================================================
  Combine ALl Reducers
============================================================================= */
const Reducer = combineReducers({
  Auth: authReducer,
  Snack: snackReducer,
});

export const rootReducer = Reducer;
