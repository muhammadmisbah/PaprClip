import { showSnack } from 'snack';
import { getBase64 } from 'utils';
import { ADD_RECEIPT } from './receipts.type';

/**
 * ADD_RECEIPT
 */
export const addReceipt = uri => async dispatch => {
  // let res;
  try {
    dispatch({ type: ADD_RECEIPT.LOADING });
    // res = await api('/receipt', 'post', user);
    const base64 = await getBase64(uri);
    dispatch({
      type: ADD_RECEIPT.SUCCESS,
      payload: {
        source: { uri: base64 },
        _id: '123',
        name: 'test',
        date: 'til feb 2019',
        total: '0.00',
      },
    });
    return base64;
  } catch ({ message }) {
    dispatch({ type: ADD_RECEIPT.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};
