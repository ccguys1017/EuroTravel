import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

import maps from "./map.reducer";

import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  form,
  maps,
  routing: routerReducer,
  auth: authReducer
});

export default rootReducer;
