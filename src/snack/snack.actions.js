import { SHOW_SNACK, HIDE_SNACK } from './snack.type';

/**
 * show snack bar action
 * @param {string} type
 * @param {string} message
 * @param {string} action
 */
export const showSnack = (
  message,
  type = 'error',
  action
) => async dispatch => {
  dispatch({ type: SHOW_SNACK, payload: { message, type, action } });
};

/**
 * hide snack bar action
 */
export const hideSnack = () => async dispatch => {
  dispatch({ type: HIDE_SNACK });
};
