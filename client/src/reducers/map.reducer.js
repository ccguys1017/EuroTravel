// import * as Actions from '../actions/types';

// const initialState = {
//     places:[],
//     searchTypes:[],
//     selectedLocation: {lat: "", long:""},
//     clicked: false,
//     saved:[]
    
// };

// export default function maps(state = initialState, action){
//     switch(action.type){
//         case Actions.NEW_PLACE:
//         console.log("NEW PLACE ADDED : " + action.place);
//         return {
//             ...state,
//             places:[...state.places, action.place]
//         }
//         break;

//         case Actions.NEW_TYPE:
            
//             return {
//                 ...state,
//                 searchTypes:[...state.searchTypes, action.thing]
//             }
//             break;
//         case Actions.SAVE_PLACE:
//             console.log("NEW PLACE SAVED : ");
//             console.log(action.item);
//             return {
//                 ...state,
//                 saved:[...state.saved, action.item]
//             }
//             break;
//         case Actions.NEW_LOCATION:
//         return{
//             ...state,
//             selectedLocation: {lat: action.lat, lng: action.lng}
//         }
//         break;

//         case Actions.HANDLE_CLICK:
//         return{...state,
//             clicked: !state.clicked
//         }
//         break;
        
//         default:
//             return state
//         }
// }

