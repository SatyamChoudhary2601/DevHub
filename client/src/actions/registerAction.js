import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import axios from "axios";

export const register = ({ name, email, password }) => async (dispatch) => {
  console.log("jskllkiiiiiiiiiiiiiiiiiiiiiiiii", name, email, password);

  // ===================================>Axios<=====================================

  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    console.log("=============>");
    const res = await axios.post("/api/users/", config, body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err
    });
  }

  //===============================> Using Fetch <============================

  // fetch("http://localhost:5000/api/users/", {
  //   // Adding method type
  //   method: "POST",

  //   // Adding body or contents to send
  //   body: JSON.stringify({
  //     name,
  //     email,
  //     password
  //   }),

  //   // Adding headers to the request
  //   headers: {
  //     "Content-type": "application/json; charset=UTF-8"
  //   }
  // })
  //   // Converting to JSON
  //   .then((response) => response.json())

  //   // Displaying results to console
  //   .then((json) =>
  //     dispatch({
  //       type: REGISTER_SUCCESS,
  //       payload: json
  //     })
  //   )
  //   .catch(
  //     (err) =>
  //     dispatch({
  //       type: REGISTER_FAIL,
  //       payload: err
  //     })
  //   );
};
