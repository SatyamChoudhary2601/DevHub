import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";

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
    console.log("eeeeeeeeeeeeeeeeeeee", email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

