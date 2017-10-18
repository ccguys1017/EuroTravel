/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Checkbox from './checkbox';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';

import axios from 'axios';

const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/api/v1';

class hotelSearch extends React.Component {
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

      /* 
      (CRUD) Send the user checkboxed itinerary data to the server to store the user-specific     itinerary data in the DB 
      */

      const cb_city = localStorage.getItem('sel_city');
      const cb_country = localStorage.getItem('sel_country');

      axios.post(`${ROOT_URL}/save_itin`, { user_email, cb_name, cb_place_id, cb_price_level, cb_rating, cb_type, cb_vicinity, cb_city, cb_country, if(cb_photo){return cb_photo} })
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
        var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
        var hostnameRegexp = new RegExp('^https?://.+?/');
        var markers = [];
        var infoWindow;
        function dropMarker(i) {
            return function() {
              markers[i].setMap(map);
            };
          }
        function addResult(result, i) {
            var results = document.getElementById('results');
            var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
            var markerIcon = MARKER_PATH + markerLetter + '.png';
    
            var tr = document.createElement('tr');
            tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
            tr.onclick = function() {
              google.maps.event.trigger(markers[i], 'click');
            };
    
            var iconTd = document.createElement('td');
            var nameTd = document.createElement('td');
            var icon = document.createElement('img');
            icon.src = markerIcon;
            icon.setAttribute('class', 'placeIcon');
            icon.setAttribute('className', 'placeIcon');
            var name = document.createTextNode(result.name);
            iconTd.appendChild(icon);
            nameTd.appendChild(name);
            tr.appendChild(iconTd);
            tr.appendChild(nameTd);
            results.appendChild(tr);
          };
          function showInfoWindow() {
            var marker = this;
            service.getDetails({placeId: marker.placeResult.place_id},
                function(place, status) {
                  if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    return;
                  }
                  infoWindow.open(map, marker);
                  buildIWContent(place);
                });
          };
          function clearResults() {
            var results = document.getElementById('results');
            while (results.childNodes[0]) {
              results.removeChild(results.childNodes[0]);
            }
          };
        
      console.log(this.props);

        if (Number(localStorage.getItem('latitude')) != null && localStorage.getItem('longitude') != null){
          var location = {lat:Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude'))}
        } else {
          var location = {lat:Number(this.props.state.maps.selectedLocation.lat), lng: Number(this.props.state.maps.selectedLocation.lng)}; 
        }
        
/*
      if (localStorage.getItem('hotel_flag') === true) {
        if (Number(localStorage.getItem('latitude')) != null && localStorage.getItem('longitude') != null){
          var location = {lat:Number(localStorage.getItem('latitude')), lng: Number(localStorage.getItem('longitude'))}
        } else {
          var location = {lat:Number(this.props.state.maps.selectedLocation.lat), lng: Number(this.props.state.maps.selectedLocation.lng)}; 
      }} else {
          if (Number(localStorage.getItem('trip_lat')) != null && localStorage.getItem('trip_lng') != null){
            var location = {lat:Number(localStorage.getItem('trip_lat')), lng: Number(localStorage.getItem('trip_lng'))}
          } else {
            var location = {lat:Number(this.props.state.maps.selectedLocation.lat), lng: Number(this.props.state.maps.selectedLocation.lng)}; 
          }
        }    
*/

        console.log('location: ' + location);
        let map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom:15
        });
        
        infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info-content')
          });
        let service = new google.maps.places.PlacesService(map);
        console.log(this.props);
        let searchTypes = this.props.state.maps.searchTypes;
        let props = this.props;

          service.nearbySearch({
            location:location,
            radius: 500,                
            types: ['lodging'],
            bounds: map.getBounds()
            
          }, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              clearResults();
              clearMarkers();
              // Create a marker for each hotel found, and assign a letter of the alphabetic to each marker icon.
              for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                  position: results[i].geometry.location,
                  animation: google.maps.Animation.DROP,
                  icon: markerIcon
                });
                // If the user clicks a hotel marker, show the details of that hotel in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
              }
            }
          });
                
        service.getDetails({
          placeId: this.props.state.maps.selectedLocation.place_id
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
          
            // Intended behavior is to set this.setState({places.place.reviews})
          }
        });
        function clearMarkers() {
            for (var i = 0; i < markers.length; i++) {
              if (markers[i]) {
                markers[i].setMap(null);
              }
            }
            markers = [];
          }
        
        function buildIWContent(place) {
            document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
                'src="' + place.icon + '"/>';
            document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
                '">' + place.name + '</a></b>';
            document.getElementById('iw-address').textContent = place.vicinity;
    document.getElementById('iw-checkbox').innerHTML = this.createCheckbox;
            if (place.formatted_phone_number) {
              document.getElementById('iw-phone-row').style.display = '';
              document.getElementById('iw-phone').textContent =
                  place.formatted_phone_number;
            } else {
              document.getElementById('iw-phone-row').style.display = 'none';
            }
    
            // Assign a five-star rating to the hotel, using a black star ('&#10029;') to indicate the rating the hotel has earned, and a white star ('&#10025;') for the rating points not achieved.
            if (place.rating) {
              var ratingHtml = '';
              for (var i = 0; i < 5; i++) {
                if (place.rating < (i + 0.5)) {
                  ratingHtml += '&#10025;';
                } else {
                  ratingHtml += '&#10029;';
                }
              document.getElementById('iw-rating-row').style.display = '';
              document.getElementById('iw-rating').innerHTML = ratingHtml;
              }
            } else {
              document.getElementById('iw-rating-row').style.display = 'none';
            }
    
            // The regexp isolates the first part of the URL (domain plus subdomain) to give a short URL for displaying in the info window.
            if (place.website) {
              var fullUrl = place.website;
              var website = hostnameRegexp.exec(place.website);
              if (website === null) {
                website = 'http://' + place.website + '/';
                fullUrl = website;
              }
              document.getElementById('iw-website-row').style.display = '';
              document.getElementById('iw-website').innerHTML = '<a href="' + website + '" target="_blank">' + website + '</a>';
            } else {
              document.getElementById('iw-website-row').style.display = 'none';
            }
          }
        var x = 0; //Counter for info marker open/close

        }
        render(){

          const cb_city = localStorage.getItem('sel_city');
          const cb_country = localStorage.getItem('sel_country');

          const footerStyle = {
            backgroundColor: "#261e72",
            fontSize: "15px",
            color: "white",
            borderTop: "1px solid #7fa5f7",
            textAlign: "center",
            padding: "0px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "40px",
            width: "100%"
          };
      
          const phantomStyle = {
            display: "block",
            padding: "20px",
            height: "60px",
            width: "100%"
          };
          
          function Footer({ children }) {
            return (
              <div>
                <div style={phantomStyle} />
                <div style={footerStyle}>{children}</div>
              </div>
            );
          }
            return(
              <div className="tripresults">
                          <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/"><strong>GuideTrip</strong></a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={2} href="/"><strong>Home</strong></NavItem>
      <NavItem eventKey={1} href="/dashboard"><strong>Dashboard</strong></NavItem>
      <NavItem eventKey={1} href="/hotelBuild"><strong>Hotels</strong></NavItem>
    </Nav>
  </Navbar>
        <h3 style={{textAlign: "center"}}><strong>Nearby Hotels for: </strong><span>{ cb_city}, {cb_country}</span></h3>
        <div id="map"></div>
        <div style={{"margin-left":"auto", "margin-right": "auto"}}>
        <div id="listing">
      <table id="resultsTable" style={{"margin-left":"auto", "margin-right": "auto"}}>
        <tbody id="results"></tbody>
      </table>
    </div>
    </div>

    <div style={{display: "none", float:"right"}}>
      <div id="info-content">
        <table>
        <tr id="iw-checkbox-row" class="iw_table_row">
            <td id="iw-checkbox"></td>
          </tr>
          <tr id="iw-url-row" class="iw_table_row">
            <td id="iw-icon" class="iw_table_icon"></td>
            <td id="iw-url"></td>
          </tr>
          <tr id="iw-address-row" class="iw_table_row">
            <td class="iw_attribute_name">Address:</td>
            <td id="iw-address"></td>
          </tr>
          <tr id="iw-phone-row" class="iw_table_row">
            <td class="iw_attribute_name">Telephone:</td>
            <td id="iw-phone"></td>
          </tr>
          <tr id="iw-rating-row" class="iw_table_row">
            <td class="iw_attribute_name">Rating:</td>
            <td id="iw-rating"></td>
          </tr>
          <tr id="iw-website-row" class="iw_table_row">
            <td class="iw_attribute_name">Website:</td>
            <td id="iw-website"></td>
          </tr>
        </table>
      </div>
    </div>
        <div className="row">
          <div className="col-sm-12">
            <form action='/dashboard' onSubmit={this.handleFormSubmit}>  
              <button className="btn btn-default" type="submit">Save</button>
            </form>
          </div>
        </div>
        <Footer>
        <a href="/"> Home</a>
        <a href="/dashboard"> Dashboard</a>
        <a href="/hotelBuild"> Hotels</a>

        <div className="footer-copyright">
          <div className="container-fluid">
            © 2017 Copyright:{" "}
            <a href="http://www.guidetrip.me"> www.Guidetrip.me </a>
          </div>
        </div>
      </Footer>
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

hotelSearch = connect(mapStateToProps, mapDispatchToProps)(hotelSearch);
      
export default hotelSearch;
