import { SHOW_SNACK, HIDE_SNACK } from './snack.type';

/* INITIAL STATE
============================================================================= */
const INITIAL_STATE = {
  visible: false,
  message: '',
  type: '',
  action: null,
};

/* ============================================================================
  Snack Reducer
============================================================================= */
export const snackReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SHOW_SNACK:
      return {
        ...state,
        ...payload,
        visible: true,
      };

    case HIDE_SNACK:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
