import { SET_SEARCH, SET_FILTERS, REMOVE_FILTER, POST_ERROR } from '../types';
export default function (state, action) {
  switch (action.type) {
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
