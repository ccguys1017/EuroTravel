import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Autocomplete from 'react-google-autocomplete';
import PlacesSearch from './search';

class Places extends Component {
  constructor(props) {
    super(props);
  }    
  state = {
    selectedLocation: { lat: 0, lng: 0 },
    clicked: false,
    placeid: ''
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render(){
    //For the default center of map
    const location = {
      lat:40.7575285,
      lng:-73.9884469
    };

    return(
      <div>
        <Autocomplete style={{width:'20%'}} 
          onPlaceSelected={(place) => {

          let selectedlatlong = place.geometry.location.toString();
          let selLat = '';
          let selLng = '';
          let onlng = false;  

          console.log('selectedlatlong: ' + selectedlatlong);
          console.log('selectedlatlong.length: ' + selectedlatlong.length);
          for (let i =0; i < selectedlatlong.length; i++) {
            if(onlng === false) {
              if ( i !== 0 && selectedlatlong[i] !== ',' ) {
                selLat = selLat.concat(selectedlatlong[i]);
              } else if (selectedlatlong[i] === ',') {
                onlng = true;
              }
            } else if(onlng === true && selectedlatlong[i] !== ')' && selectedlatlong[i] !== ' ') {
              selLng = selLng.concat(selectedlatlong[i]);
            }
          } // end for loop
          console.log('selectedlatlong: ' + selectedlatlong);
          console.log('Lat = '  + selLat + ' || Lng = ' + selLng);
          this.setState({selectedLocation: {lat: selLat, lng:selLng}})
          this.setState({clicked: true})
          console.log('Selected Location: ' + this.state.selectedLocation);
          this.setState({placeid: place.place_id});
          console.log('place_id: ' + this.state.placeid);
          }}  // end onPlaceSelected
          types={['(regions)']}
        />
        {(this.state.clicked === true) ? <PlacesSearch selectedLocation= {this.state.selectedLocation} placeid={this.state.placeid} /> : <h2>Please enter a location to view</h2> }
      </div>
    );
  };
};

export default Places;