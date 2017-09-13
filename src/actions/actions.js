import * as types from './types';

export const insertMap = (lat, lng) => ({type: types.INSERT_MAP,lat, lng});
export const locationClicked = () => ({type: types.LOCATION_CLICKED});