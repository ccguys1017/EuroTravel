import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Tripbuild from './tripbuild';
import PlacesSearch from './search';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';


import Checkbox from './checkbox';

const ROOT_URL = 'http://localhost:8080/api/v1';

const places = [];  /* This will be the object array for the real data returned from the 
                       looped Google Places API call */
let testPlaces =  localStorage.getItem('test_places');
console.log(testPlaces);

class Tripresults extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      itins_saved: false,
      placeid: ''
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
    this.placesForAllTypes = new Set();

  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.props.maps.places.map(this.createCheckbox)
  }
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

  createCheckbox = (name, place_id) => (
    <Checkbox
      label={name}
      handleCheckboxChange={this.toggleCheckbox}
      key={place_id}
      handleSave={this.handleSave}
    />
  )
  handleSave = place => {
      console.log(place);
      const user_email = localStorage.getItem('userEmail');
      const cb_name = place.name;
      const cb_place_id = place.place_id;
      const cb_price_level = place.price_level;
      const cb_rating = place.rating;
      const cb_type = place.types[0];
      if(place.photos){
        const cb_photo = place.photos[0].html_attributions[0];
        
      }
      const cb_vicinity = place.vicinity;

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
    

    console.log("HANDLE SAVE FUNCTION COMPLETED");
  } //End handleSave()

  onButtonClick () {
    this.context.router.history.push('/hotelSearch');
  };

  IterateOverPlaces = () => (
    this.placesForAllTypes.add('test'),
    <PlacesSearch style={{width:'20%'}} types={['(regions)']} handleSave = {this.handleSave} selectedLocation={{lat:localStorage.getItem('trip_lat'), lng:localStorage.getItem('trip_lng')}} placeid={this.state.placeid} />
  )

  createCheckboxes = () => (
    
    this.props.maps.places.map(this.createCheckbox)
    
  )

  render() {
    const footerStyle = {
      backgroundColor: "black",
      fontSize: "20px",
      color: "white",
      borderTop: "1px solid #E7E7E7",
      textAlign: "center",
      padding: "20px",
      position: "fixed",
      left: "0",
      bottom: "0",
      height: "90px",
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
    
    return (
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
        <h3>Your Custom Itinerary Results</h3>

        <h4>Lengend:</h4>
        <div>
          <span className="badge" id='testA'>A - Store</span>
          <span className="badge" id='testB'>B - Lodging</span>
          <span className="badge" id='testC'>C - Restaurant/Cafe</span>
          <span className="badge" id='testD'>D - Museum/Art Gallery</span>
          <span className="badge" id='testE'>E - Pharmacy</span>
          <span className="badge" id='testF'>F - Subway</span>
          <span className="badge" id='testG'>G - Airport</span>
          <span className="badge" id='testH'>H - Hospital</span>
          <span className="badge" id='testI'>I - Bus</span>
        </div>
        <div>
          <span className="badge" id='testJ'>J - Park</span>
          <span className="badge" id='testK'>K - ATM</span>
          <span className="badge" id='testL'>L - Bank</span>
          <span className="badge" id='testM'>M - Doctor/Dentist</span>
          <span className="badge" id='testN'>N - Zoo</span>
          <span className="badge" id='testO'>O - Police</span>
          <span className="badge" id='testP'>P - Train</span>
          <span className="badge" id='testQ'>Q - School</span>
          <span className="badge" id='testR'>R - Bar</span>
          <span className="badge" id='testS'>S - Church</span>
        </div>
        <div>
          <span className="badge" id='testT'>T - Synagogue</span>
          <span className="badge" id='testU'>U - Mosque</span>
          <span className="badge" id='testV'>V - University</span>
          <span className="badge" id='testW'>W - Embassy</span>
          <span className="badge" id='testX'>X - Library</span>
          <span className="badge" id='testY'>Y - Spa</span>
          <span className="badge" id='testZ'>Z - Other</span>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.IterateOverPlaces()}
            <form action='/dashboard' onSubmit={this.handleFormSubmit}>
            <div id="map"></div>
            <ListGroup>
              {this.createCheckboxes()}
            </ListGroup>
              <button className="btn btn-default" type="submit">Save</button>
            </form>
            <button onClick={this.onButtonClick.bind(this)} className='btn btn-default'>Find Hotels In Area</button> 

          </div>
        </div>
        <Footer>
        <a href="/"> Home</a>
              <a href="/dashboard"> Dashboard</a>
              <a href="/hotelBuild"> Find Hotels</a>
            
            <div class="footer-copyright">
        <div class="container-fluid">
            © 2017 Copyright: <a href="/"> GuideTrip </a>

        </div>
        </div>
        </Footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itins_saved: state.itins_saved,
  maps: state.maps
});

function mapDispatchToProps(dispatch){
  return bindActionCreators(actionCreators, dispatch);
}
export default Tripresults = connect(mapStateToProps, mapDispatchToProps)(Tripresults);
