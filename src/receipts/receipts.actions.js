import { ADD_RECEIPT } from './receipts.type';
import { showSnack } from '@snack';
// import { api } from '@utils';

/**
 * ADD_RECEIPT
 */
export const addReceipt = data => async dispatch => {
  // let res;
  try {
    dispatch({ type: ADD_RECEIPT.LOADING });
    // res = await api('/receipt', 'post', user);
    dispatch({ type: ADD_RECEIPT.SUCCESS, payload: data });
  } catch ({ message }) {
    dispatch({ type: ADD_RECEIPT.ERROR });
    dispatch(showSnack(message));
  }
};
