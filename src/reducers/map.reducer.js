import * as Actions from '../actions/types';

const initialState = {
    places:[],
    searchTypes:[],
    selectedLocation: {lat: "", long:"", place_id:""},
    clicked: false
    
};

export default function maps(state = initialState, action){
    switch(action.type){
        case Actions.NEW_PLACE:
        console.log("NEW PLACE ADDED : " + action.place.name);
        return {
            ...state,
            places:[...state.places, action.place]
        }
        break;

        case Actions.NEW_TYPE:
            console.log("NEW TYPE ADDED : " + action.thing);
            return {
                ...state,
                searchTypes:[...state.searchTypes, action.thing]
            }
            break;
        case Actions.NEW_LOCATION:
        return{
            ...state,
            selectedLocation: {lat: action.lat, lng: action.lng, place_id:action.placeid}
        }
        break;

        case Actions.HANDLE_CLICK:
        return{...state,
            clicked: !state.clicked
        }
        break;

        case Actions.WIPE_PLACES:
        return{...state,
            places: []}
            break;
        default:
            return state
        }
}