import { ADD_RECEIPT } from './receipts.type';

/* ============================================================================
  INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  list: [],
  addLoader: false,
};

/* ============================================================================
  Receipts Reducer
============================================================================= */
export const receiptsReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // ADD_RECEIPT
    case ADD_RECEIPT.LOADING:
      return { ...state, addLoader: true };
    case ADD_RECEIPT.SUCCESS:
      return { ...state, addLoader: false, list: [...state.list, payload] };
    case ADD_RECEIPT.UPDATE:
      return { ...state, addLoader: false, list: [...payload] };
    case ADD_RECEIPT.ERROR:
      return { ...state, addLoader: false };

    default:
      return state;
  }
};
