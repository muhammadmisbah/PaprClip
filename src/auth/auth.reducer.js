import {
  LOGIN,
  FACEBOOK_LOGIN,
  LOGIN_STATUS,
  REGISTRATION,
  LOGOUT,
} from './auth.type';

/* ============================================================================
  INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  user: null,
  isAuthenticated: false,
  loginLoader: false,
  facebookLoader: false,
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

    // LOGOUT
    case LOGOUT.SUCCESS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
