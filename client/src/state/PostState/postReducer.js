import {
  SET_SEARCH,
  SET_FILTERS,
  REMOVE_FILTER,
  ADD_POST,
  POST_ERROR,
  DELETE_POST,
  MODIFY_POST,
} from '../../types';
export default function (state, action) {
  switch (action.type) {
    case ADD_POST:
      return { ...state };
    case DELETE_POST:
      return {
        ...state,
      };
    case MODIFY_POST:
      return {
        ...state,
      };
    case POST_ERROR:
      return { ...state, error: action.payload };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: state.filters.filter((f, key) => key !== action.payload),
      };
    default:
      return state;
  }
}
