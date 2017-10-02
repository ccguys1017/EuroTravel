import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import Tripbuild from './tripbuild';

const ROOT_URL = 'http://localhost:8080/api/v1';

let saved_itineraries = [];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itins_retrieved: false,
      city: '',
      country: ''
    };
  }    

  static contextTypes = {
    router: PropTypes.object
  };

  onBackClick () {
    this.context.router.history.push('/');
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let trip_city, trip_country = '';

    if (document.getElementById('countrydashradio1').checked) {
      trip_country = 'England';
    } else if (document.getElementById('countrydashradio2').checked) {
      trip_country = 'France';
    } else if (document.getElementById('countrydashradio3').checked) {
      trip_country = 'Germany';
    } else if (document.getElementById('countrydashradio4').checked) {
      trip_country = 'Italy';
    } else if (document.getElementById('countrydashradio5').checked) {
      trip_country = 'Spain';
    } else if (document.getElementById('countrydashradio6').checked) {
      trip_country = 'Netherlands';
    }

    if (document.getElementById('citydashradio1').checked) {
      trip_city = 'London';
    } else if (document.getElementById('citydashradio2').checked) {
      trip_city = 'Paris';
    } else if (document.getElementById('citydashradio3').checked) {
      trip_city = 'Berlin';
    } else if (document.getElementById('citydashradio4').checked) {
      trip_city = 'Rome';
    } else if (document.getElementById('citydashradio5').checked) {
      trip_city = 'Madrid';
    } else if (document.getElementById('citydashradio6').checked) {
      trip_city = 'Amsterdam';
    }


    console.log('this.state.city: ' + trip_city);
    console.log('this.state.country: ' + trip_country);    

    localStorage.setItem('sel_city', trip_city);
    localStorage.setItem('sel_country', trip_country);
    this.setState({city : trip_city});
    this.setState({country : trip_country});
    /*
    <Tripbuild city={this.state.city} country={this.state.country} />
    */
    this.context.router.history.push('/tripbuild');
  }

  componentDidMount() {
    const user_email = localStorage.getItem('userEmail');
    // (RAB) send the user checkboxed itinerary data to the server to store the user-specific itinerary data in the DB 
    axios.post(`${ROOT_URL}/get_itin`, { user_email })
      .then(response => {
        saved_itineraries = response.data.payload;
        this.setState({itins_retrieved : true})
      })
      .catch(err => {
        this.setState({itins_retrieved : false});        
      })
  }

  render() {
    const itins_retrieved = this.state.itins_retrieved;
    if (!itins_retrieved) {
      return <div>Loading.......</div>;
    }
    return (      
      <div className='dashboard'>
        <h3>Dashboard</h3>
        <div className='col-md-6'>
          <h4><strong>Your Previously saved Itineraries</strong></h4>
          <ul className="itineraries">
            {saved_itineraries.map(saved_itins => 
            <li key={saved_itins.place_id}>
              <span className="badge">{saved_itins.type}</span>
              {saved_itins.name} {saved_itins.price_level} {saved_itins.rating} {saved_itins.vicinity} 
            </li>
            )}
          </ul>
        </div>
        <div className='col-md-3'>
          <h2>Select a Country:</h2>
          <form action='/tripbuild' onSubmit={this.handleFormSubmit}>
            <div className='dashradio'>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio1' />
                <label>England</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio2' />
                <label>France</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio3' />
                <label>Germany</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio4' />
                <label>Italy</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio5' />
                <label>Spain</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='countrydashradio6' />
                <label>Netherlands</label>
              </div>
            </div>
          </form>
        </div>
        <div className='col-md-3'>
          <h2>Select a City:</h2>
          <form action='/tripbuild' onSubmit={this.handleFormSubmit}>
            <div className='dashradio'>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio1' />
                <label>London</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio2' />
                <label>Paris</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio3' />
                <label>Berlin</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio4' />
                <label>Rome</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio5' />
                <label>Madrid</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='citydashradio6' />
                <label>Amsterdam</label>
              </div>
            </div>
            <button className='btn btn-default' type='submit'>
              Click to Create Custom Itinerary
            </button>
            <div>
              <strong>or</strong>
            </div>
          </form>
          <form action='/places'>
            <button className='btn btn-default' type='submit'>
              Click to Manually Search Places
            </button>
            </form>
          <button onClick={this.onBackClick.bind(this)} className='btn btn-default'>Back</button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  itins_retrieved: state.itins_retrieved
});

export default connect(mapStatetoProps)(Dashboard);