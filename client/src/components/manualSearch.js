/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Checkbox from './checkbox';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8080/api/v1';
class manualSearch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          itins_saved: false,
        };
    }
    static contextTypes = {
      router: PropTypes.object
    };


    createCheckbox = (name, place_id) => (
      <Checkbox
        label={name}
        handleCheckboxChange={this.toggleCheckbox}
        key={place_id}
        handleSave={this.handleSave}
      />)
      componentWillMount = () => {
        this.selectedCheckboxes = new Set();
        this.placesForAllTypes = new Set();
    
        console.log(this.props);
      }
    
      toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
      }
  createCheckboxes = () => (
    
    this.props.state.maps.places.map(this.createCheckbox)
    
  )

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {   
      console.log(checkbox);
      const user_email = localStorage.getItem('userEmail');
      const cb_name = checkbox.name;
      const cb_place_id = checkbox.place_id;
      const cb_price_level = checkbox.price_level;
      const cb_rating = checkbox.rating;
      const cb_type = checkbox.types[0];
      if(checkbox.photos){
        const cb_photo = checkbox.photos[0].html_attributions[0];
        
      }
      const cb_vicinity = checkbox.vicinity;

      /* (CRUD) Send the user checkboxed itinerary data to the server to store the user-specific     itinerary data in the DB */

      axios.post(`${ROOT_URL}/save_itin`, { user_email, cb_name, cb_place_id, cb_price_level, cb_rating, cb_type, cb_vicinity, if(cb_photo){return cb_photo} })
      .then(response => {
        this.setState({
          itins_saved: true
        });
      })
      .catch(err => {
        this.setState({
          itins_saved: false
        });        
      })
    }

    this.context.router.history.push('/dashboard');
  }
    componentDidMount() {
      console.log(this.props);
        let location = {lat:Number(this.props.state.maps.selectedLocation.lat), lng: Number(this.props.state.maps.selectedLocation.lng)};
        //let location ={lat:Number(localStorage.getItem('trip_lat')), lng:Number(localStorage.getItem('trip_lng'))};
        console.log('location: ' + location);
        let map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom:15
        });
        
        let test_places = [];
        
        let service = new google.maps.places.PlacesService(map);
        console.log(this.props);
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
        service.getDetails({
          placeId: this.props.state.maps.selectedLocation.place_id
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
        render(){
            return(
              <div className="tripresults">
        <h3>Your Custom Itinerary Results</h3>
        <div className="row">
          <div className="col-sm-12">
            
            <form action='/dashboard' onSubmit={this.handleFormSubmit}>
            <ListGroup>
              {this.createCheckboxes()}
            </ListGroup>
              <button className="btn btn-default" type="submit">Save</button>
            </form>
          </div>
        </div>
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
      manualSearch = connect(mapStateToProps, mapDispatchToProps)(manualSearch);
      
      export default manualSearch;

    


