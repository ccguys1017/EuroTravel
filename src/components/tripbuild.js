import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dashboard from './dashboard';
import PlacesSearch from './search';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/api/v1';

let cities = [];
let places_type = [];

class Tripbuild extends Component {
  constructor(props) {
    super(props);
  }    
  state = {
      lng: 0,
      lat: 0,
      city: '',
      country: ''
  };

  static contextTypes = {
    router: PropTypes.object
  };

componentWillMount = () => {
    let longitude = 0;
    let latitude = 0;

    const city = localStorage.getItem('sel_city');
    const country = localStorage.getItem('sel_country');
    //console.log('tripbuild city: ' + this.props.city);
    //console.log('tripbuild country: ' + this.props.country); 

    axios.post(`${ROOT_URL}/cities_lng_lat`, { city: city, country: country })
    .then(response => {
      cities = response.data.payload;
      longitude = response.data.payload[0].lng;
      latitude = response.data.payload[0].lat;
      this.setState({
          lng: longitude,
          lat: latitude,
      });
    })
    .catch(err => {
      this.setState({
      });        
    })
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    if (document.getElementById('checkbox_place_store').checked) {
        places_type.push('store');
    }
    if (document.getElementById('checkbox_place_lodging').checked) {
        places_type.push('lodging');
    }
    if (document.getElementById('checkbox_place_cafe').checked) {
        places_type.push('cafe');
    }
    if (document.getElementById('checkbox_place_museum').checked) {
        places_type.push('museum');
    }
    if (document.getElementById('checkbox_place_pharmacy').checked) {
        places_type.push('pharmacy');
    }
    if (document.getElementById('checkbox_place_subway').checked) {
        places_type.push('subway_station');
    }
    if (document.getElementById('checkbox_place_airport').checked) {
        places_type.push('airport');
    }
    if (document.getElementById('checkbox_place_hospital').checked) {
        places_type.push('hospital');
    }
    if (document.getElementById('checkbox_place_bus').checked) {
        places_type.push('bus_station');
    }
    if (document.getElementById('checkbox_place_park').checked) {
        places_type.push('park');
    }
    if (document.getElementById('checkbox_place_atm').checked) {
        places_type.push('atm');
    }
    if (document.getElementById('checkbox_place_bank').checked) {
        places_type.push('bank');
    }
    if (document.getElementById('checkbox_place_doctor').checked) {
        places_type.push('doctor');
    }
    if (document.getElementById('checkbox_place_zoo').checked) {
        places_type.push('zoo');
    }
    if (document.getElementById('checkbox_place_police').checked) {
        places_type.push('police');
    }
    if (document.getElementById('checkbox_place_train').checked) {
        places_type.push('train_station');
    }
    if (document.getElementById('checkbox_place_school').checked) {
        places_type.push('school');
    }
    if (document.getElementById('checkbox_place_bar').checked) {
        places_type.push('bar');
    }

    console.log('longitude: ' + JSON.stringify(this.state.lng));
    console.log('latitude: ' + JSON.stringify(this.state.lat));
    console.log('Place Type Array: [' + places_type + ']');

    localStorage.setItem('trip_lat', JSON.stringify(this.state.lat));
    localStorage.setItem('trip_lng', JSON.stringify(this.state.lng));
    localStorage.setItem('place_type_array', places_type);
    console.log(places_type);
    console.log("============ LOOK HERE ==========");
    for (var i = 0; i < places_type.length; i ++){
        this.props.addType(places_type[i]);
        console.log("Place added: " + places_type[i]);
    }

    console.log("Places_type map completed");
    console.log(this.props);
    this.context.router.history.push('/tripresults');


    /*
     (RAB) We now have our longitude/latitude for selected city/country and our Places 'type' (itinerary) array. We can now iterate our Google Places API calls over our Places 'type' array to collect itinerary data (push the returned API data into an Object Array which we will use the array map() method to show the itinerary data along with a checkbox to allow the user to save selected itineraries)
    */

/*
    for (const checkbox of this.selectedCheckboxes) {   

    }
    this.context.router.history.push('/tripresults');
*/
  }

 onClick () {
    this.context.router.history.push('/dashboard');
  }

  render() {
    return ( 
      <div className='tripbuild'>
        <h3>Create Your Custom Itinerary</h3>
        <form action='/tripresults' onSubmit={this.handleFormSubmit}>
          <div className='form-group'>
            <label className='col-md-3 control-label'>Check your Itinerary Items</label>  
            <div className='col-md-9 columns'>
              <div className='col-md-4 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_store' value='item-1' />Store
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_lodging' value='item-2' />Lodging
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_cafe' value='item-3' />Cafe
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_museum' value='item-1' />Museum
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_pharmacy' value='item-2' />Pharmacy
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_subway' value='item-3' />Subway Station
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_airport' value='item-1' />Airport
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_hospital' value='item-2' />Hospital
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_bus' value='item-3' />Bus Station
                </label>
              </div>
              <div className='col-md-4 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_park' value='item-1' />Park
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_atm' value='item-2' />ATM
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_bank' value='item-3' />Bank
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_doctor' value='item-1' />Doctor
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_zoo' value='item-2' />Zoo
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_police' value='item-3' />Police
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_train' value='item-1' />Train Station
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_school' value='item-2' />School
                </label>
                <label className='checkbox-inline'>
                    <input type='checkbox' name='Checkboxes' id='checkbox_place_bar' value='item-3' />Bar
                </label>
              </div>
            </div>
          </div>
          <button className='btn btn-default' type='submit'>Click to Generate Itinerary</button>
        </form>
        <button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return {state: state};
  };
function mapDispatchToProps(dispatch){
    return bindActionCreators(actionCreators, dispatch);
  }
  Tripbuild = connect(mapStateToProps, mapDispatchToProps)(Tripbuild);
  export default Tripbuild;