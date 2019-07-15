import { combineReducers } from 'redux';
import { authReducer } from '@auth';
import { profileReducer } from '@profile';
import { receiptsReducer } from '@receipts';
import { snackReducer } from '@snack';

/* ============================================================================
  Combine ALl Reducers
============================================================================= */
const Reducer = combineReducers({
  Auth: authReducer,
  Profile: profileReducer,
  Receipts: receiptsReducer,
  Snack: snackReducer,
});

export const rootReducer = Reducer;
