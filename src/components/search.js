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
        //placeId: this.props.maps.selectedLocation.place_id
        placeId: this.state.place_id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        
          // Intended behavior is to set this.setState({places.place.reviews})
        }
      });
    
  
      var x = 0; //Counter for info marker open/close
      function createMarker(place, x) {
        let markerColor = '/png/blue_markerA.png';
        let placeLoc = place.geometry.location;   // DEBUG (RAB) Capture Places data
        let placeName = place.name;               // DEBUG (RAB) Capture Places data
        let placeType = place.types[0];           // DEBUG (RAB) Capture Places data
        let placeAddr = place.vicinity;           // DEBUG (RAB) Capture Places data
        let placeRating = place.rating;           // DEBUG (RAB) Capture Places data
        console.log('place: ' + place);                       // DEBUG (RAB) Capture Places data

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
          <button onClick={this.onClick.bind(this)} className='btn btn-default'>Dashboard</button>  
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