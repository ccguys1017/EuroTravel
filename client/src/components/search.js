/* eslint-disable no-undef */
  // DO NOT TOUCH LINE ONE. NO IDEA WHAT IT DOES OR HOW IT WORKS BUT IT MAKES EVERYTHING WORK DONT TOUCH IT
  import  '../index.css';
  import React, {Component} from 'react';
  import PropTypes from 'prop-types';

  export default class PlacesSearch extends React.Component {
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

    componentDidMount() {
      let state = this.state;
      console.log('componentDidMount().placeid: ' + state.placeid);
      console.log(this.props);
      let location = {lat:Number(this.props.selectedLocation.lat), lng: Number(this.props.selectedLocation.lng)};
      let map = new google.maps.Map(document.getElementById('map'), {
          center: location,
          zoom:15
      });

      let service = new google.maps.places.PlacesService(map);
      
      service.nearbySearch({
        location:location,
        radius: 500,
        //type: [''] 
        type: ['store'] 
        //type: ['lodging'] 
        //type: ['cafe'] 
        //type: ['museum'] 
        //type: ['pharmacy'] 
        //type: ['subway_station'] 
        //type: ['airport'] 
        //type: ['hospital'] 
        //type: ['bus_station'] 
        //type: ['park']  // CRITICAL: Define itinerary that's passed in Google Places API //
      }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i =0; i < results.length; i++) {
              createMarker(results[i]);
              state.Places.push(results[i]);
            }
            //console.log(results);
          }
      });

      service.getDetails({
        placeId: this.state.place_id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
         
          // Intended behavior is to set this.setState({places.place.reviews})
        }
      });
      
      function createMarker(place) {
        let placeLoc = place.geometry.location;
        let placeName = place.name;
        let placeType = place.types[0];
        let placeAddr = place.vicinity;
        let placeRating = place.rating;
        console.log(place);
        console.log('Name: ' + placeName);
        console.log('Type: ' + placeType);
        console.log('Address: ' + placeAddr);
        console.log('Rating: ' + placeRating);
        let marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
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

/*
          <ul className="places">
      {results.map(place => 
        <li>
          <span className="badge">{place.name}</span>
          {place.name}
        </li>
      )}
    </ul>

*/