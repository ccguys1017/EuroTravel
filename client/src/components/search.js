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
          radius: 1500,                
          type: [searchTypes[x]]            // DEBUG (DEJ)
          
        }, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (let i =0; i < results.length; i++) {
                createMarker(results[i], x);
                props.addPlace(results[i]);
              }
              
              console.log(props);

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

        let markerColor = '';
        let markerLabel = '';
        let pinColor = 'FFFFFF'

        let placeLoc = place.geometry.location;   
        let placeName = place.name;               
        let placeType = place.types[0];           
        let placeAddr = place.vicinity;           
        let placeRating = place.rating;           
        console.log('place: ' + place);                       

        switch (placeType) {
          case 'store':
            pinColor = "8B8BE2";  // blue
            markerLabel = 'A';
            break;
          case 'lodging':
            pinColor = "C66060";  // brown
            markerLabel = 'B';
            break;
          case 'cafe':
            pinColor = "37B537";  // darkgreen
            markerLabel = 'C';
            break;
          case 'restaurant':
            pinColor = "37B537";  // darkgreen
            markerLabel = 'C';
            break;
          case 'museum':
            pinColor = "99D69A";  // green
            markerLabel = 'D';
            break;
          case 'art_gallery':
            pinColor = "99D69A";  // green
            markerLabel = 'D';
            break;
          case 'pharmacy':
            pinColor = "FFA500";  // orange
            markerLabel = 'E';
            break;
          case 'subway_station':
            pinColor = "BED2DB";  // paleblue
            markerLabel = 'F';
            break;
          case 'airport':
            pinColor = "FFC0CB";  // pink
            markerLabel = 'G';
            break;
          case 'hospital':
            pinColor = "800080";  // purple
            markerLabel = 'H';
            break;
          case 'bus_station':
            pinColor = "DC8E8E";  // red
            markerLabel = 'I';
            break;
          case 'park':
            pinColor = "FFFF00";  // yellow
            markerLabel = 'J';
            break;
          case 'atm':
            pinColor = "8B8BE2";  // blue
            markerLabel = 'K';
            break;
          case 'bank':
            pinColor = "C66060";  // brown
            markerLabel = 'L';
            break;
          case 'doctor':
            pinColor = "37B537";  // darkgreen
            markerLabel = 'M';
            break;
          case 'dentist':
            pinColor = "37B537";  // darkgreen
            markerLabel = 'M';
            break;
          case 'zoo':
            pinColor = "99D69A";  // green
            markerLabel = 'N';
            break;
          case 'police':
            pinColor = "FFA500";  // orange
            markerLabel = 'O';
            break;
          case 'train_station':
            pinColor = "BED2DB";  // paleblue
            markerLabel = 'P';
            break;
          case 'school':
            pinColor = "FFC0CB";  // pink
            markerLabel = 'Q';
            break;
          case 'bar':
            pinColor = "800080";  // purple
            markerLabel = 'R';
            break;
          case 'church':
            pinColor = "DC8E8E";  // red
            markerLabel = 'S';
            break;
          case 'synagogue':
            pinColor = "FFFF00";  // yellow
            markerLabel = 'T';
            break;
          case 'mosque':
            pinColor = "8B8BE2";  // blue
            markerLabel = 'U';
            break;
          case 'university':
            pinColor = "C66060";  // brown
            markerLabel = 'V';
            break;
          case 'embassy':
            pinColor = "37B537";  // darkgreen
            markerLabel = 'W';
            break;
          case 'library':
            pinColor = "99D69A";  // green
            markerLabel = 'X';
            break;
          case 'spa':
            pinColor = "FFA500";  // orange
            markerLabel = 'Y';
            break;
          default:
            pinColor = "5D8B9F";  // paleblue
            markerLabel = 'Z';
        };

        var pinImage = new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/" + pinColor + "/",
        new google.maps.Size(21, 44),
        new google.maps.Point(0,-10),
        new google.maps.Point(10,44));

        markerColor = pinImage;

        let infowindow = new google.maps.InfoWindow();
        let marker = new google.maps.Marker({
          map: map,
          icon: markerColor,
          label: markerLabel,
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