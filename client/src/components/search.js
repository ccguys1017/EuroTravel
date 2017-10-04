/* eslint-disable no-undef */
  // DO NOT TOUCH LINE ONE. NO IDEA WHAT IT DOES OR HOW IT WORKS BUT IT MAKES EVERYTHING WORK DONT TOUCH IT
  import  '../index.css';
  import React, {Component} from 'react';
  import PropTypes from 'prop-types';
  import { connect } from 'react-redux';
  import {bindActionCreators} from 'redux';
  import * as actionCreators from '../actions';
  class PlacesSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Places: [],
        placeid: this.props.placeid
      }
    } 

    static contextTypes = {
      router: PropTypes.object
    };
    
    onClick () {
      this.context.router.history.push('/dashboard');
    };

    componentWillReceiveProps(nextProps){
      console.log(nextProps);
      let location = {lat:Number(this.props.selectedLocation.lat), lng: Number(this.props.selectedLocation.lng)};
      console.log(location);
      
      
    }
    
    componentDidMount() {

      let state = this.state;
      let location = {lat:Number(this.props.selectedLocation.lat), lng: Number(this.props.selectedLocation.lng)};
      //let location ={lat:Number(localStorage.getItem('trip_lat')), lng:Number(localStorage.getItem('trip_lng'))};
      console.log('location: ' + location);
      let map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom:15
      });

      let test_places = [];
      
      let service = new google.maps.places.PlacesService(map);
      
      let searchTypes = this.props.state.maps.searchTypes;
      let props = this.props;
      for (let x=0; x < searchTypes.length; x++){
        service.nearbySearch({
          location:location,
          radius: 500,                
          type: [searchTypes[x]]            // DEBUG (DEJ)
          
        }, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (let i =0; i < results.length; i++) {
                createMarker(results[i], x);
                props.addPlace(results[i]);
                //store.addPlace(results[i]);
                

              }
              
              console.log(props);

              //onsole.log('results: ' + JSON.stringify(results));
            }
        });
      }
     
      
    
      console.log(state.Places);

      service.getDetails({
        placeId: this.state.place_id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        
          // Intended behavior is to set this.setState({places.place.reviews})
        }
      });
    
  
      var x = 0; //Counter for info marker open/close
      function createMarker(place, x) {
        let markerColor = ['/png/blue_markerA.png',          // 0
                           '/png/brown_markerB.png',         // 1
                           '/png/darkgreen_markerC.png',     // 2    
                           '/png/green_markerD.png',         // 3
                           '/png/orange_markerE.png',        // 4
                           '/png/paleblue_markerF.png',      // 5
                           '/png/pink_markerG.png',          // 6
                           '/png/purple_markerH.png',        // 7
                           '/png/red_markerI.png',           // 8
                           '/png/yellow_markerJ.png'];       // 9
        let placeLoc = place.geometry.location;   // DEBUG (RAB) Capture Places data
        let placeName = place.name;               // DEBUG (RAB) Capture Places data
        let placeType = place.types[0];           // DEBUG (RAB) Capture Places data
        let placeAddr = place.vicinity;           // DEBUG (RAB) Capture Places data
        let placeRating = place.rating;           // DEBUG (RAB) Capture Places data
        console.log('place: ' + place);                       // DEBUG (RAB) Capture Places data
        let infowindow = new google.maps.InfoWindow();
        let marker = new google.maps.Marker({
          map: map,
          icon: markerColor[x],
          position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          console.log(place);
          infowindow.close();
          infowindow.setContent('<div><strong>' + placeName + '</strong><br>' +
          'Place Type: ' + placeType + '<br>' +
          placeAddr + '</div>');
          
          infowindow.open(map, this);
          x +=1;
          if (x ===2){
            infowindow.close();  //closes the window after user clicks twice (x is the counter)
            x = 0;
          }
        });
        
      }; // end create marker

    }
    
    

    render() {
      return(
        <div>
          <button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>  
        </div>
      )
    }
}
const mapStateToProps = (state) =>{
  return {state: state};
};
function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}
PlacesSearch = connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);

export default PlacesSearch;