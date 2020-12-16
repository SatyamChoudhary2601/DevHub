import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { loadUser } from "./registerAction";

//Login User

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    setAuthToken(res.data.token);
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
