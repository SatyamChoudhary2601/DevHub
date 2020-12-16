import {LOGOUT, CLEAR_PROFILE} from './types'


export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE
  })
    dispatch({
      type: LOGOUT
    });
  };