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
        //let markerColor = '/png/blue_markerA.png';
        
        let markerColor = '';     //RAB
        let markerLabel = '';     //RAB
        let pinColor = 'FFFFFF';  //RAB
        
        let placeLoc = place.geometry.location;   // DEBUG (RAB) Capture Places data
        let placeName = place.name;               // DEBUG (RAB) Capture Places data
        let placeType = place.types[0];           // DEBUG (RAB) Capture Places data
        let placeAddr = place.vicinity;           // DEBUG (RAB) Capture Places data
        let placeRating = place.rating;           // DEBUG (RAB) Capture Places data
        console.log('place: ' + place);                       // DEBUG (RAB) Capture Places data

        switch (placeType) {
          case 'store':
            pinColor = "0000FF";  // blue
            markerLabel = 'A';
            //markerColor = '/png/blue_markerA.png';
            break;
          case 'lodging':
            pinColor = "A52A2A";  // brown
            markerLabel = 'B';
              //markerColor = '/png/brown_markerB.png';
            break;
          case 'cafe':
            pinColor = "006400";
            markerLabel = 'C';
              //markerColor = '/png/darkgreen_markerC.png';
            break;
          case 'museum':
            pinColor = "008000";
            markerLabel = 'D';
              //markerColor = '/png/green_markerD.png';
            break;
          case 'pharmacy':
            pinColor = "FFA500";
            markerLabel = 'E';
              //markerColor = '/png/orange_markerE.png';
            break;
          case 'subway_station':
            pinColor = "66CDAA";
            markerLabel = 'F';
              //markerColor = '/png/paleblue_markerF.png';
            break;
          case 'airport':
            pinColor = "FFC0CB";
            markerLabel = 'G';
              //markerColor = '/png/pink_markerG.png';
            break;
          case 'hospital':
            pinColor = "800080";
            markerLabel = 'H';
              //markerColor = '/png/purple_markerH.png';
            break;
          case 'bus_station':
            pinColor = "FF0000";
            markerLabel = 'I';
              //markerColor = '/png/red_markerI.png';
            break;
          case 'park':
            pinColor = "FFFF00";
            markerLabel = 'J';
              //markerColor = '/png/yellow_markerJ.png';
            break;
          case 'atm':
            pinColor = "0000FF";
            markerLabel = 'K';
              //markerColor = '/png/blue_markerK.png';
            break;
          case 'bank':
            pinColor = "A52A2A";
            markerLabel = 'L';
              //markerColor = '/png/brown_markerL.png';
            break;
          case 'doctor':
            pinColor = "006400";
            markerLabel = 'M';
              //markerColor = '/png/darkgreen_markerM.png';
            break;
          case 'zoo':
            pinColor = "008000";
            markerLabel = 'N';
              //markerColor = '/png/green_markerN.png';
            break;
          case 'police':
            pinColor = "FFA500";
            markerLabel = 'O';
              //markerColor = '/png/orange_markerO.png';
            break;
          case 'train_station':
            pinColor = "66CDAA";
            markerLabel = 'P';
              //markerColor = '/png/paleblue_markerP.png';
            break;
          case 'school':
            pinColor = "FFC0CB";
            markerLabel = 'Q';
              //markerColor = '/png/pink_markerQ.png';
            break;
          case 'bar':
            pinColor = "800080";
            markerLabel = 'R';
              //markerColor = '/png/purple_markerR.png';
            break;
          case 'church':
            pinColor = "FF0000";
            markerLabel = 'S';
              //markerColor = '/png/red_markerS.png';
            break;
          case 'synagogue':
            pinColor = "FFFF00";
            markerLabel = 'T';
              //markerColor = '/png/yellow_markerT.png';
            break;
          case 'mosque':
            pinColor = "0000FF";
            markerLabel = 'U';
              //markerColor = '/png/blue_markerU.png';
            break;
          case 'university':
            pinColor = "A52A2A";
            markerLabel = 'V';
              //markerColor = '/png/brown_markerV.png';
            break;
          case 'embassy':
            pinColor = "006400";
            markerLabel = 'W';
              //markerColor = '/png/darkgreen_markerW.png';
            break;
          case 'library':
            pinColor = "008000";
            markerLabel = 'X';
              //markerColor = '/png/green_markerX.png';
            break;
          case 'spa':
            pinColor = "FFA500";
            markerLabel = 'Y';
              //markerColor = '/png/orange_markerY.png';
            break;
          default:
            pinColor = "66CDAA";
            markerLabel = 'Z';
              //markerColor = '/png/paleblue_markerZ.png';
        };

        var pinImage = new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/" + pinColor + "/",
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10,34));

        markerColor = pinImage;
        
        
        
 /*       
        switch (placeType) {
          case 'store':
            markerColor = '/png/blue_markerA.png';
            break;
          case 'lodging':
            markerColor = '/png/brown_markerB.png';
            break;
          case 'cafe':
            markerColor = '/png/darkgreen_markerC.png';
            break;
          case 'museum':
            markerColor = '/png/green_markerD.png';
            break;
          case 'pharmacy':
            markerColor = '/png/orange_markerE.png';
            break;
          case 'subway_station':
            markerColor = '/png/paleblue_markerF.png';
            break;
          case 'airport':
            markerColor = '/png/pink_markerG.png';
            break;
          case 'hospital':
            markerColor = '/png/purple_markerH.png';
            break;
          case 'bus_station':
            markerColor = '/png/red_markerI.png';
            break;
          case 'park':
            markerColor = '/png/yellow_markerJ.png';
            break;
          case 'atm':
            markerColor = '/png/blue_markerK.png';
            break;
          case 'bank':
            markerColor = '/png/brown_markerL.png';
            break;
          case 'doctor':
            markerColor = '/png/darkgreen_markerM.png';
            break;
          case 'zoo':
            markerColor = '/png/green_markerN.png';
            break;
          case 'police':
            markerColor = '/png/orange_markerO.png';
            break;
          case 'train_station':
            markerColor = '/png/paleblue_markerP.png';
            break;
          case 'school':
            markerColor = '/png/pink_markerQ.png';
            break;
          case 'bar':
            markerColor = '/png/purple_markerR.png';
            break;
          case 'church':
            markerColor = '/png/red_markerS.png';
            break;
          case 'synagogue':
            markerColor = '/png/yellow_markerT.png';
            break;
          case 'mosque':
            markerColor = '/png/blue_markerU.png';
            break;
          case 'university':
            markerColor = '/png/brown_markerV.png';
            break;
          case 'embassy':
            markerColor = '/png/darkgreen_markerW.png';
            break;
          case 'library':
            markerColor = '/png/green_markerX.png';
            break;
          case 'spa':
            markerColor = '/png/orange_markerY.png';
            break;
          default:
            markerColor = '/png/paleblue_markerZ.png';
        };

        let infowindow = new google.maps.InfoWindow();
        let marker = new google.maps.Marker({
          map: map,
          //icon: markerColor[x],
          icon: markerColor,
          position: place.geometry.location
        });
        
*/
        
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
