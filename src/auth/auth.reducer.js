import {
  LOGIN,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  LOGIN_STATUS,
  REGISTRATION,
  LOGOUT,
} from './auth.type';
import { UPDATE_PROFILE } from '../profile/profile.type';

/* ============================================================================
  INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  loginLoader: false,
  facebookLoader: false,
  googleLoader: false,
  registrationLoader: false,
};

/* ============================================================================
  Auth Reducer
============================================================================= */
export const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // LOGIN
    case LOGIN.LOADING:
      return { ...state, loginLoader: true };
    case LOGIN.SUCCESS:
      return {
        ...state,
        loginLoader: false,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN.ERROR:
      return { ...state, loginLoader: false };

    // FACEBOOK_LOGIN
    case FACEBOOK_LOGIN.LOADING:
      return { ...state, facebookLoader: true };
    case FACEBOOK_LOGIN.SUCCESS:
      return {
        ...state,
        facebookLoader: false,
        isAuthenticated: true,
        user: payload,
      };
    case FACEBOOK_LOGIN.ERROR:
      return { ...state, facebookLoader: false };

    // GOOGLE_LOGIN
    case GOOGLE_LOGIN.LOADING:
      return { ...state, googleLoader: true };
    case GOOGLE_LOGIN.SUCCESS:
      return {
        ...state,
        googleLoader: false,
        isAuthenticated: true,
        user: payload,
      };
    case GOOGLE_LOGIN.ERROR:
      return { ...state, googleLoader: false };

    // LOGIN_STATUS
    case LOGIN_STATUS.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };

    // REGISTRATION
    case REGISTRATION.LOADING:
      return { ...state, registrationLoader: true };
    case REGISTRATION.SUCCESS:
      return {
        ...state,
        registrationLoader: false,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTRATION.ERROR:
      return { ...state, registrationLoader: false };

    // UPDATE_PROFILE
    case UPDATE_PROFILE.SUCCESS:
      return {
        ...state,
        user: payload,
      };

    // LOGOUT
    case LOGOUT.SUCCESS:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
