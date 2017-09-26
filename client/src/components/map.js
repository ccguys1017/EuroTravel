import React, {Component} from 'react';
import Autocomplete from 'react-google-autocomplete';

export default class Main extends Component {
  render() {
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

        let selectedlatlong = place.geometry.location.toString();
        let selLat = "";
        let selLng = "";
        let onlng = false;
                    
        for (let i =0; i < selectedlatlong.length; i++) {
          if(onlng === false){
            if ( i !== 0 && selectedlatlong[i] !== ',' ) {
              selLat = selLat.concat(selectedlatlong[i]);
            } else if (selectedlatlong[i] === ',') {
              onlng = true;
            }
          } else if(onlng === true && selectedlatlong[i] !== ')' && selectedlatlong[i] !== ' ') {
            selLng = selLng.concat(selectedlatlong[i]);
          }
        } // end for loop

        store.dispatch(insertMap(selLat, selLng));
        store.dispatch(locationClicked());
        }}  // end onPlaceSelected
        types={['(regions)']}
      />
      <h1> Hi im working 1 </h1>
      <div style={{width:300, height:600}}>
        <GoogleApiWrapper 
          centerAroundCurrentLocation={false}
          mapCenter={{lat: store.getState().maps.selectedLocation.lat, lng: store.getState().maps.selectedLocation.lng}} 
        />
      </div>
    </div>
  );
  };
};