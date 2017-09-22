import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';





export default class Main extends Component{
    render(){
            //For the default center of map
        const location = {
            lat:40.7575285,
            lng:-73.9884469
        };
        console.log("APP.JS RUNNING");

        return(
            <div>
            <Autocomplete style={{width:'90%'}} 
                onPlaceSelected={(place) => {

                    var selectedlatlong = place.geometry.location.toString();
                    var selLat = "";
                    var selLng = "";
                    var onlng = false;
                    
                    console.log(place);
                    console.log(selectedlatlong[1]);
                    for (var i =0; i < selectedlatlong.length; i++){
                        if(onlng === false){
                        if ( i !== 0 && selectedlatlong[i] !== ',' ){
                            selLat = selLat.concat(selectedlatlong[i]);
                        } else if (selectedlatlong[i] === ','){
                            onlng = true;
                        }
                        } // end first if 
                           else if(onlng === true && selectedlatlong[i] !== ')' && selectedlatlong[i] !== ' '){
                                selLng = selLng.concat(selectedlatlong[i]);
                            }
                        } // end for loop
                        console.log(selectedlatlong);
                        console.log("Lat = "  + selLat + " || Lng =" + selLng);

                        store.dispatch(insertMap(selLat, selLng));
                        console.log(store.getState());
                        store.dispatch(locationClicked());
                        console.log(store.getState().maps.selectedLocation.lat);
                        
                    }
                   
                }  // end onPlaceSelected
                types={['(regions)']}
                />
            
                <h1> Hi im working </h1>
                <div style={{width:300, height:600}}>
                    <GoogleApiWrapper 
                        centerAroundCurrentLocation={false}
                        mapCenter={{lat: store.getState().maps.selectedLocation.lat, lng: store.getState().maps.selectedLocation.lng} } 
                          />
                </div>
            </div>
        );
    };
};