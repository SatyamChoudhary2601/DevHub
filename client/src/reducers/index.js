import { combineReducers } from "redux";
import registerReducer from "./registerReducers";
import profileReducer from './profileReducer'

export default combineReducers({
  register: registerReducer,
  profile: profileReducer
});
