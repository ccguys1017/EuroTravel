<<<<<<< HEAD
import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GoogleApiWrapper from './map';
import Autocomplete from 'react-google-autocomplete';

import rootReducer from './../reducers';

import {createStore, bindActionCreators} from 'redux';
import {insertMap, locationClicked} from './../actions';

const store = createStore(rootReducer, window.STATE_FROM_SERVER);

class Places extends Component {
  constructor(props) {
    super(props);
  }    
  state = {};

  static contextTypes = {
    router: PropTypes.object
  };
/*
 onClick () {
    this.context.router.history.push('/dashboard');
  }
*/


render(){
  //For the default center of map

const location = {
  lat:40.7575285,
  lng:-73.9884469
};
console.log("APP.JS RUNNING");

return(
  <div className='places'>
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


/*
  render() {
    return ( 
      <div className='tripbuild'>
        <h3>Explore Your World</h3>
        <form action='/dashboard'>

        </form>
        <button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>
      </div>
    );
  }
*/
}

const mapStatetoProps = state => ({});

export default connect(mapStatetoProps)(Places);

/*
<button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>
*/
=======
import React, {Component} from 'react';

export default class Places extends Component{
    render(){
        return(
            <div>This is the Places page </div>
        )
    }
}
>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
