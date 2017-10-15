import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import maps from './map.reducer';
const rootReducer = combineReducers({
  form,
  // maps,
  auth: authReducer
});

export default rootReducer;
