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
<<<<<<< HEAD
=======

>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
        case Actions.INSERT_MAP:
            return Object.assign({}, state, {
                selectedLocation: {lat: action.lat, lng: action.lng },
                marker: {
                    title:'Your selected Location.',
                    name:'LOCATION',
                    position:{lat:action.lat, lng: action.lng}
<<<<<<< HEAD
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
=======
            }
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
>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
