import { combineReducers } from "redux";
import maps from "./map.reducer";
import {reducer as formReducer} from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    maps,
    form: formReducer,
    routing: routerReducer
});

export default rootReducer;
