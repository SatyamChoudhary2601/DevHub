import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        isLoading: false
      };

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        isAuthenticated: false,
        isLoading: false,
        errors: payload
      };
    default:
      return state;
  }
}
