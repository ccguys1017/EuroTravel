import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD

import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { connect } from 'react-redux';
import {insertMap} from '../actions';
=======
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import { connect } from 'react-redux';
import {insertMap} from '../actions/actions';
>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c

let Container = React.createClass({
  
  

  onMapMoved: function(props, map) {
    console.log("onMapMoved");
    const center = map.center;
  },


  onMarkerClick: function(props, marker, e) {
    console.log("ON_MARKER_CLICK =============");
    // this.props.state.maps.state.maps.setState({
    //   selectedPlace: props,
    //   activeMarker: marker,
    //   showingInfoWindow: true
    // });
  },

  // fetchPlaces: function(mapProps, map) {
  //   const {google} = mapProps;
  //   const service = new google.maps.places.PlacesService(map);
  //   // ... 
  // },
  onInfoWindowClose: function() {
    console.log("ON_INFO_WINDOW_CLOSE ==============");
    console.log(this.props.state);
    // this.props.state.maps.state.maps.setState({
    //   showingInfoWindow: false,
    //   activeMarker: null
    // })
  },


  onMapClicked: function(props) {
      console.log("THE MAP WAS CLICKED");
      //console.log(this.props.google.maps.Map.prototype.setCenter());
      console.log(this.props.google.maps);  
      // this.props.mapCenter = {
      //   lat:Number(this.props.state.maps.selectedLocation.lat),
      //   lng:Number(this.props.state.maps.selectedLocation.lng)
      // }

    // if (this.state.showingInfoWindow) {
    //   this.props.state.maps.state.maps.setState({
    //     showingInfoWindow: false,
    //     activeMarker: null
    //   })
    // }
  },

  render: function() {
<<<<<<< HEAD
    console.log('this.props.state.maps.clicked: ' + this.props.state.maps.clicked);
    //this.props.state.maps.clicked = true;
=======
    console.log(this.props.state.maps);
>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    if (this.props.state.maps.clicked === true){
<<<<<<< HEAD
      console.log('this.props.state.maps.clicked: ' + this.props.state.maps.clicked);
=======
    console.log(this.props.state.maps.selectedLocation.lat);
>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
    return (
      <div>
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}
          containerStyle={{}}
          centerAroundCurrentLocation={false}
          center={{lat:this.props.state.maps.selectedLocation.lat, lng: this.props.state.maps.selectedLocation.lng}}
          initialCenter={{
            lat:this.props.state.maps.selectedLocation.lat,
            lng:this.props.state.maps.selectedLocation.lng
          }} 
          onClick={this.onMapClicked}
          >
          <Marker title={this.props.state.maps.marker.title} 
            name ={this.props.state.maps.marker.name}
            position={{lat: this.props.state.maps.selectedLocation.lat, lng: this.props.state.maps.selectedLocation.lng}}
          />
          </Map>
          </div>
      )
    } else {
      return ( <div> <h3>Please search for your location </h3> </div>)
    }
  }
});

const mapStateToProps = (state) => { 
  return { state: state };
};

Container = connect(mapStateToProps)(Container);
export default GoogleApiWrapper({apiKey: ('AIzaSyAMdFDbMMpTtr8YgDIST1Uu_TPukPCflKk')})(Container)




// import React from 'react';
// import ReactDOM from 'react-dom';

// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// const apiKey = "AIzaSyAMdFDbMMpTtr8YgDIST1Uu_TPukPCflKk";
// const googleMapURL = "https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyAYA1eCg1ToFOxVfVxqZHzqNnNJFgnLNYw";


// export class Container extends React.Component{
//     render(){
//         const style ={ width: '100%', height: '100%'};
//         return(
//                 <Map google={this.props.google} style={style} initialCenter={{ lat:0, lng:0}} zoom={14} onClick={this.onMapClicked}>

//                     <Marker onClick={this.onMarkerClick} name={'Current location'}/>

//                     <InfoWindow onClose={this.onInfoWindowClose}>
//                         <div>
//                             <h1>{this.state.selectedPlace.name}</h1>
//                         </div>
//                     </InfoWindow>
//                 </Map>
            
//         );
//     }
// }
<<<<<<< HEAD
=======

>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
