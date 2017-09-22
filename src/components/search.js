/* eslint-disable no-undef */
  // DO NOT TOUCH LINE ONE. NO IDEA WHAT IT DOES OR HOW IT WORKS BUT IT MAKES EVERYTHING WORK DONT TOUCH IT
import  '../index.css';
import React, {Component} from 'react';
export default class PlacesSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Places: [],
            placeid: this.props.placeid
        }
    } 
    
    
    componentDidMount(){
    let state = this.state;
    console.log(state.placeid);
    console.log(this.props);
    var location = {lat:Number(this.props.selectedLocation.lat), lng: Number(this.props.selectedLocation.lng)};
    let map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom:15
    });
    let service = new google.maps.places.PlacesService(map);
    
    
    
    service.nearbySearch({
        location:location,
        radius: 500,
        type: ['store', 'lodging']
    }, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK){
            for (var i =0; i < results.length; i++){
                createMarker(results[i]);
                state.Places.push(results[i]);
                console.log(state);
                
            }
            console.log(results);
        }
    });
    service.getDetails({
      placeId: this.state.place_id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place.reviews);
       
        // Intended behavior is to set this.setState({places.place.reviews})
      }
    })
    
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        console.log(place);
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });

    
   }
}
    render(){
        // const { places } = this.props.Places;
        console.log(this.props);
        document.getElementById('map').innerHTML= map
        
        return(
        <div>
            
                <h1>IM WORKING</h1>
                
        </div>
        )
        }
    }