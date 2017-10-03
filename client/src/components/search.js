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

    // componentDidUpdate = (prevProps, prevState) => {    
    //         let state = this.state;
    //         let location = {lat:Number(this.props.selectedLocation.lat), lng: Number(this.props.selectedLocation.lng)};
    //         //let location ={lat:Number(localStorage.getItem('trip_lat')), lng:Number(localStorage.getItem('trip_lng'))};
    //         console.log('location: ' + location);
    //         let map = new google.maps.Map(document.getElementById('map'), {
    //             center: location,
    //             zoom:15
    //         });
    //         let props = this.props;
    //         let service = new google.maps.places.PlacesService(map);
    //         while(props.state.maps.places.length === 30){
    //         service.nearbySearch({
    //           location:location,
    //           radius: 500,                // DEBUG (RAB)
    //           //type: ['store']             // DEBUG (RAB)
    //           //type: ['lodging']         // DEBUG (RAB)
    //           type: ['cafe']            // DEBUG (RAB)
    //           //type: ['museum']          // DEBUG (RAB)
    //           //type: ['pharmacy']        // DEBUG (RAB)
    //           //type: ['subway_station']  // DEBUG (RAB)
    //           //type: ['airport']         // DEBUG (RAB)
    //           //type: ['hospital']        // DEBUG (RAB)
    //           //type: ['bus_station']     // DEBUG (RAB)
    //           //type: ['park']            // CRITICAL: (RAB) Define place type passed into Google Places API //
    //         }, function(results, status) {
    //             if (status === google.maps.places.PlacesServiceStatus.OK) {
    //               for (let i =0; i < results.length; i++) {
    //                 createMarker(results[i]);
    //                 state.Places.push(results[i]);
                    
    //                 //if (props.
                    
    //                 console.log(props);
    //               }
    //               for (let x =0; x < state.Places.length; x ++){
                    
    //                 if (props.state.maps.places.length > 30){break;}
    //                   props.addPlace(state.Places[x]);
                   
    
    //               }
    //               //console.log('results: ' + JSON.stringify(results));
    //             }
    //         });
      
    //         service.getDetails({
    //           placeId: this.state.place_id
    //         }, function(place, status) {
    //           if (status === google.maps.places.PlacesServiceStatus.OK) {
              
    //             // Intended behavior is to set this.setState({places.place.reviews})
    //           }
    //         });
    //       }
        
    //         function createMarker(place) {
    //           let placeLoc = place.geometry.location;   // DEBUG (RAB) Capture Places data
    //           let placeName = place.name;               // DEBUG (RAB) Capture Places data
    //           let placeType = place.types[0];           // DEBUG (RAB) Capture Places data
    //           let placeAddr = place.vicinity;           // DEBUG (RAB) Capture Places data
    //           let placeRating = place.rating;           // DEBUG (RAB) Capture Places data
    //           console.log('place: ' + place);                       // DEBUG (RAB) Capture Places data
    //           let infowindow = new google.maps.InfoWindow();
    //           let marker = new google.maps.Marker({
    //             map: map,
    //             position: place.geometry.location
    //           });
    //           google.maps.event.addListener(marker, 'click', function() {
    //             console.log(place);
    //             infowindow.close();
    //             infowindow.setContent('<div><strong>' + placeName + '</strong><br>' +
    //             'Place Type: ' + placeType + '<br>' +
    //             placeAddr + '</div>');
                
    //             infowindow.open(map, this);
    //             x +=1;
    //             if (x ===2){
    //               infowindow.close();  //closes the window after user clicks twice (x is the counter)
    //               x = 0;
    //             }
    //           });
              
    //         }
    //       }
    
    
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
      console.log(this.props.state);

      console.log(this.props);

      let props = this.props;
      
      let service = new google.maps.places.PlacesService(map);
      
     
      service.nearbySearch({
        location:location,
        radius: 500,                // DEBUG (RAB)
        //type: ['store']             // DEBUG (RAB)
        //type: ['lodging']         // DEBUG (RAB)
        type: ['cafe']            // DEBUG (RAB)
        //type: ['museum']          // DEBUG (RAB)
        //type: ['pharmacy']        // DEBUG (RAB)
        //type: ['subway_station']  // DEBUG (RAB)
        //type: ['airport']         // DEBUG (RAB)
        //type: ['hospital']        // DEBUG (RAB)
        //type: ['bus_station']     // DEBUG (RAB)
        //type: ['park']            // CRITICAL: (RAB) Define place type passed into Google Places API //
      }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i =0; i < results.length; i++) {
              createMarker(results[i]);
              state.Places.push(results[i]);
              //store.addPlace(results[i]);
              
              console.log(props.state);
            }
            

              for (let x =0; x < state.Places.length; x ++){
                
                if (props.state.maps.places.length > 30){break;}
                  props.addPlace(state.Places[x]);
               

              }
            //onsole.log('results: ' + JSON.stringify(results));
          }
      });
    
      console.log(state.Places);

      service.getDetails({
        placeId: this.state.place_id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        
          // Intended behavior is to set this.setState({places.place.reviews})
        }
      });
    
  
      var x = 0; //Counter for info marker open/close
      function createMarker(place) {
        let placeLoc = place.geometry.location;   // DEBUG (RAB) Capture Places data
        let placeName = place.name;               // DEBUG (RAB) Capture Places data
        let placeType = place.types[0];           // DEBUG (RAB) Capture Places data
        let placeAddr = place.vicinity;           // DEBUG (RAB) Capture Places data
        let placeRating = place.rating;           // DEBUG (RAB) Capture Places data
        console.log('place: ' + place);                       // DEBUG (RAB) Capture Places data
        let infowindow = new google.maps.InfoWindow();
        let marker = new google.maps.Marker({
          map: map,
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
          <h1>IM WORKING</h1>
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