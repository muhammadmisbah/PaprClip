import { showSnack } from 'snack';
import { getBase64 } from 'utils';
import { ADD_RECEIPT } from './receipts.type';

/**
 * ADD_RECEIPT
 */
export const addReceipt = payload => async dispatch => {
  // let res;
  try {
    dispatch({ type: ADD_RECEIPT.LOADING });
    // res = await api('/receipt', 'post', user);
    const base64 = await getBase64(payload.uri);
    dispatch({
      type: ADD_RECEIPT.SUCCESS,
      payload: {
        source: { uri: base64 },
        ...payload,
        base64
        // _id: payload._id,
        // name: payload.name,
        // date: payload.date,
        // total: payload.total,
      },
    });
    return base64;
  } catch ({ message }) {
    dispatch({ type: ADD_RECEIPT.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};

export const deleteReceipt = payload => dispatch => {
  // dispatch({ type: ADD_RECEIPT.LOADING });
  let List = payload.list;
  List.splice(payload.index, 1)
  dispatch({
    type: ADD_RECEIPT.UPDATE,
    payload: List,
  });
  dispatch(showSnack("Item Deleted"));
};
