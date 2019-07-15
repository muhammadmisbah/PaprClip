import { ADD_RECEIPT } from './receipts.type';

/* ============================================================================
  INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  list: [],
  loader: false,
};

/* ============================================================================
  Receipts Reducer
============================================================================= */
export const receiptsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_RECEIPT.SUCCESS:
      return { ...state, list: [...state.list, payload] };
    default:
      return state;
  }
};
