import { UPDATE_PROFILE, UPDATE_PASSWORD } from './profile.type';

/* ============================================================================
  INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  profileLoader: false,
  passwordLoader: false,
};

/* ============================================================================
  Profile Reducer
============================================================================= */
export const profileReducer = (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    // UPDATE_PROFILE
    case UPDATE_PROFILE.LOADING:
      return { ...state, profileLoader: true };
    case UPDATE_PROFILE.SUCCESS:
      return { ...state, profileLoader: false };
    case UPDATE_PROFILE.ERROR:
      return { ...state, profileLoader: false };

    // UPDATE_PASSWORD
    case UPDATE_PASSWORD.LOADING:
      return { ...state, passwordLoader: true };
    case UPDATE_PASSWORD.SUCCESS:
      return { ...state, passwordLoader: false };
    case UPDATE_PASSWORD.ERROR:
      return { ...state, passwordLoader: false };

    default:
      return state;
  }
};
