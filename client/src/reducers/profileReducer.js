import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  isLoading: true,
  errors: {}
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        errors: payload,
        isLoading: false,
        profile: null,
        profiles: []
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        isLoading: false,
        errors: {}
      };
    default:
      return state;
  }
};

export default profileReducer;
