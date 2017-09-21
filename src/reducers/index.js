<<<<<<< HEAD
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
=======
import { combineReducers } from "redux";
import maps from "./map.reducer";
import {reducer as formReducer} from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    maps,
    form: formReducer,
    routing: routerReducer
>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
});

export default rootReducer;
