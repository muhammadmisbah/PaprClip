import { combineReducers } from 'redux';
import { authReducer } from '@auth';
import { profileReducer } from '@profile';
import { snackReducer } from '@snack';

/* ============================================================================
  Combine ALl Reducers
============================================================================= */
const Reducer = combineReducers({
  Auth: authReducer,
  Profile: profileReducer,
  Snack: snackReducer,
});

export const rootReducer = Reducer;
