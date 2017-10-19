import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  FETCH_CITY_LONLAT
} from '../actions/types';

export default function (state = {authenticated: false}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case FETCH_MESSAGE:
      return { ...state, message: action.payload }
    case FETCH_CITY_LONLAT:
      return { ...state, error: action.type }
    default:
      return state;
  };
};
