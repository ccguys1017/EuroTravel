import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Tripbuild from './tripbuild';
import PlacesSearch from './search';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

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

    console.log(this.props);
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

      const user_email = localStorage.getItem('userEmail');
      const cb_name = checkbox.name;
      const cb_place_id = checkbox.place_id;
      const cb_price_level = checkbox.price_level;
      const cb_rating = checkbox.rating;
      const cb_type = checkbox.types[0];
      const cb_photo = checkbox.photos[0].html_attributions[0];
      const cb_vicinity = checkbox.vicinity;

      /* (CRUD) Send the user checkboxed itinerary data to the server to store the user-specific     itinerary data in the DB */

      axios.post(`${ROOT_URL}/save_itin`, { user_email, cb_name, cb_place_id, cb_price_level, cb_rating, cb_type, cb_vicinity, cb_photo })
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
    />
  )

  IterateOverPlaces = () => (
    this.placesForAllTypes.add('test'),
    <PlacesSearch style={{width:'20%'}} types={['(regions)']} selectedLocation={{lat:localStorage.getItem('trip_lat'), lng:localStorage.getItem('trip_lng')}} placeid={this.state.placeid} />
  )

  createCheckboxes = () => (
    
    this.props.maps.places.map(this.createCheckbox)
    
  )

  render() {
    
    return (
      <div className="tripresults">
        <h3>Your Custom Itinerary Results</h3>
        <div className="row">
          <div className="col-sm-12">
            {this.IterateOverPlaces()}
            <form action='/dashboard' onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <button className="btn btn-default" type="submit">Save</button>
            </form>
          </div>
        </div>
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
