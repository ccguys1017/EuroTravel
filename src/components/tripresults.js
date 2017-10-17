/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Checkbox from './checkbox';
import axios from 'axios';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';

const ROOT_URL = 'http://localhost:8080/api/v1';
//const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/';

class Tripresults extends React.Component{
    constructor(props){
        super(props);

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
        localStorage.setItem('hotel_flag', false);
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

  onButtonClick () {
    localStorage.setItem('hotel_flag', true);
    this.context.router.history.push('/hotelSearch');
  };

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
      
      const cb_city = localStorage.getItem('sel_city');
      const cb_country = localStorage.getItem('sel_country');

      /* 
      (CRUD) Send the user checkboxed itinerary data to the server to store the user-specific itinerary data in the DB 
      */

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
        let location = {lat:Number(this.props.state.maps.selectedLocation.lat), lng: Number(this.props.state.maps.selectedLocation.lng)};
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
            type: [searchTypes[x]]           
            
          }, function(results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i =0; i < results.length; i++) {
                  createMarker(results[i], x);
                  props.addPlace(results[i]);
                  
                }
                        
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
        
          var prev_infowindow =false; 
          var markerCount = 0;
          google.maps.event.addListener(marker, 'click', function() {
            console.log(place);
            
            markerCount += 1;
            if( prev_infowindow ) {
              prev_infowindow.close();
              console.log("Marker Closed");
            } 
            prev_infowindow = infowindow;
            
            infowindow.setContent('<div><strong>' + placeName + '</strong><br>' +
            'Place Type: ' + placeType + '<br>' +
            placeAddr + '</div>');
            infowindow.open(map, this);

          });
          
        }; // end create marker
        
        }
        render(){

          const cb_city = localStorage.getItem('sel_city');
          const cb_country = localStorage.getItem('sel_country');    
          
          console.log(localStorage.getItem('latitude'));
          console.log(localStorage.getItem('longitude'));

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
        <a href="/">GuideTrip</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={2} href="/">Home</NavItem>
      <NavItem eventKey={1} href="/dashboard">Dashboard</NavItem>
      <NavItem eventKey={1} href="/hotelBuild">Hotels</NavItem>
    </Nav>
  </Navbar>
    <h3 style={{textAlign: "center"}}><strong>Your Custom Itinerary Results for: </strong><span>{ cb_city}, {cb_country}</span></h3>
        <h4 style={{textAlign: "center"}}><strong>Marker Legend</strong></h4>
        <div className='row1'>
          <div className='col-md-12 columns'>
          <div className='col-md-1 columns'>
            </div>
            <div className='col-md-1 columns'>
              <span className="badge" id='testA'>A - Store</span>
              <span className="badge" id='testB'>B - Lodging</span>
              <span className="badge" id='testC'>C - Restaurant/Cafe</span>
              <span className="badge" id='testD'>D - Museum/Art Gallery</span>
              <span className="badge" id='testE'>E - Pharmacy</span>
              <span className="badge" id='testF'>F - Subway</span>
            </div>
            <div className='col-md-1 columns'>
            </div>
            <div className='col-md-1 columns'>
              <span className="badge" id='testG'>G - Airport</span>
              <span className="badge" id='testH'>H - Hospital</span>
              <span className="badge" id='testI'>I - Bus</span>
              <span className="badge" id='testJ'>J - Park</span>
              <span className="badge" id='testK'>K - ATM</span>
              <span className="badge" id='testL'>L - Bank</span>
            </div>
            <div className='col-md-1 columns'>
            </div>
            <div className='col-md-1 columns'>
              <span className="badge" id='testM'>M - Doctor/Dentist</span>
              <span className="badge" id='testN'>N - Zoo</span>
              <span className="badge" id='testO'>O - Police</span>
              <span className="badge" id='testP'>P - Train</span>
              <span className="badge" id='testQ'>Q - School</span>
              <span className="badge" id='testR'>R - Bar</span>
            </div>
            <div className='col-md-1 columns'>
            </div>
            <div className='col-md-1 columns'>
              <span className="badge" id='testS'>S - Church</span>
              <span className="badge" id='testT'>T - Synagogue</span>
              <span className="badge" id='testU'>U - Mosque</span>
              <span className="badge" id='testV'>V - University</span>
              <span className="badge" id='testW'>W - Embassy</span>
              <span className="badge" id='testX'>X - Library</span>
            </div>
            <div className='col-md-1 columns'>
            </div>
            <div className='col-md-1 columns'>
              <span className="badge" id='testY'>Y - Spa</span>
              <span className="badge" id='testZ'>Z - Other</span>
            </div>
          </div>
        </div>
        <div id="map">
          </div>
        <div className="row">
          <div className="col-sm-12">            
            <form action='/dashboard' onSubmit={this.handleFormSubmit}>
            <ListGroup>
              {this.createCheckboxes()}
            </ListGroup>
              <button className="btn btn-default" type="submit">Click to Save checked Itineraries</button>
            </form>
            <button onClick={this.onButtonClick.bind(this)} className='btn btn-default'>Find Hotels In Area</button> 

          </div>
        </div>
        <br/>
        <br/>
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

Tripresults = connect(mapStateToProps, mapDispatchToProps)(Tripresults);
      
export default Tripresults;
