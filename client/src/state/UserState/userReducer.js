import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  LOGOUT,
} from '../types';

export default function (state, action) {
  switch (action.type) {
    case REGISTER_SUCCES:
    case LOGIN_SUCCES:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };

    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        error: action.payload,
      };

    case LOGIN_FAIL:
      return { ...state, error: action.payload };

    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };

    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
