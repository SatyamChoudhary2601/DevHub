import { combineReducers } from "redux";
import registerReducer from "./registerReducers";

export default combineReducers({
  register: registerReducer
});
