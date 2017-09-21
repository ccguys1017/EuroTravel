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
    marker:{
        title:"test",
        name:"TEST",
        position:{lat:0, lng:0}
    
    },
    clicked: false
};

export default function maps(state = initialState, action){
    switch (action.type) {
        case Actions.INSERT_MAP:
            return Object.assign({}, state, {
                selectedLocation: {lat: action.lat, lng: action.lng },
                marker: {
                    title:'Your selected Location.',
                    name:'LOCATION',
                    position:{lat:action.lat, lng: action.lng}
                }
            });
        case Actions.LOCATION_CLICKED:
            return Object.assign({}, state, {
                 clicked: true
            });
        default:
            return state;
    }
};
