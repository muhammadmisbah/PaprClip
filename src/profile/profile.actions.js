import { UPDATE_PROFILE, UPDATE_PASSWORD } from './profile.type';
import { showSnack } from 'snack';
import { api } from 'utils';

/**
 * UPDATE_PROFILE
 */
export const updateProfile = data => async dispatch => {
  let res;
  try {
    dispatch({ type: UPDATE_PROFILE.LOADING });
    res = await api('/profile', 'put', data);
    dispatch({ type: UPDATE_PROFILE.SUCCESS, payload: res });
    dispatch(showSnack('Profile has updated successfully', 'success'));
    return 1;
  } catch ({ message }) {
    dispatch({ type: UPDATE_PROFILE.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};

/**
 * UPDATE_PASSWORD
 */
export const updatePassword = data => async dispatch => {
  let res;
  try {
    dispatch({ type: UPDATE_PASSWORD.LOADING });
    res = await api('/profile/update_password', 'put', data);
    dispatch({ type: UPDATE_PASSWORD.SUCCESS, payload: res.user });
    dispatch(showSnack('Password has updated successfully', 'success'));
    return 1;
  } catch ({ message }) {
    dispatch({ type: UPDATE_PASSWORD.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};
