import { AsyncStorage } from 'react-native';
import { api } from '@utils';
import {
  LOGIN,
  FACEBOOK_LOGIN,
  LOGIN_STATUS,
  REGISTRATION,
  LOGOUT,
} from './auth.type';
import { showSnack } from '@snack';

/**
 * LOGIN
 */
export const login = user => async dispatch => {
  let res;
  try {
    dispatch({ type: LOGIN.LOADING });
    res = await api('/auth/login', 'post', user);
    await AsyncStorage.setItem('auth_token', res.token);
    dispatch({ type: LOGIN.SUCCESS, payload: res.user });
    return 1;
  } catch ({ message }) {
    dispatch({ type: LOGIN.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};

/**
 * FACEBOOK_LOGIN
 */
export const facebookLogin = access_token => async dispatch => {
  let res;
  try {
    dispatch({ type: FACEBOOK_LOGIN.LOADING });
    res = await api('/auth/facebook_login', 'post', { access_token });
    await AsyncStorage.setItem('auth_token', res.token);
    dispatch({ type: FACEBOOK_LOGIN.SUCCESS, payload: res.user });
    return 1;
  } catch ({ message }) {
    dispatch({ type: FACEBOOK_LOGIN.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};

/**
 * LOGIN_STATUS
 */
export const loginStatus = () => async dispatch => {
  let res;
  try {
    dispatch({ type: LOGIN_STATUS.LOADING });
    res = await api('/auth/status');
    dispatch({ type: LOGIN_STATUS.SUCCESS, payload: res.user });
    return 1;
  } catch ({ message }) {
    dispatch(logout());
    dispatch({ type: LOGIN_STATUS.ERROR });
    return 0;
  }
};

/**
 * REGISTRATION
 */
export const registration = user => async dispatch => {
  let res;
  try {
    dispatch({ type: REGISTRATION.LOADING });
    res = await api('/auth/register', 'post', user);
    await AsyncStorage.setItem('auth_token', res.token);
    dispatch({ type: REGISTRATION.SUCCESS, payload: res.user });
    return 1;
  } catch ({ message }) {
    dispatch({ type: REGISTRATION.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};

/**
 * LOGOUT
 */
export const logout = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT.LOADING });
    await AsyncStorage.removeItem('auth_token');
    dispatch({ type: LOGOUT.SUCCESS });
    return 1;
  } catch ({ message }) {
    dispatch({ type: LOGOUT.ERROR });
    dispatch(showSnack(message));
    return 0;
  }
};
