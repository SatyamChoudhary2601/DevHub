import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  isLoading: false,
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
        profile:null,
        profiles:[]
      };
    
    default:
      return state;
  }
};

export default profileReducer;
