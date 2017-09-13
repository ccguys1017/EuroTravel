import * as Actions from '../actions/types';

const initialState = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    latlong:{},
    selectedLocation: {
        lat:"0",
        lng:"0"
    },
    clicked: false
};

export default function maps(state = initialState, action){
    switch (action.type) {

        case Actions.INSERT_MAP:
            return Object.assign({}, state, {
                selectedLocation: {lat: action.lat, lng: action.lng }
            });
            break;

        case Actions.LOCATION_CLICKED:
        return Object.assign({}, state, {
            clicked: true
        });
        break
        default:
            return state;
    }
}