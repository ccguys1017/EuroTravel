import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

const ROOT_URL = 'http://localhost:8080/api/v1';

let saved_itineraries = [];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false
    };
  }    

  static contextTypes = {
    router: PropTypes.object
  };

  onBackClick () {
    this.context.router.history.push('/');
  }

  componentDidMount() {
    const user_email = localStorage.getItem('userEmail');
    // (RAB) send the user checkboxed itinerary data to the server to store the user-specific itinerary data in the DB 
    axios.post(`${ROOT_URL}/itinerary2`, { user_email })
      .then(response => {
        console.log('payload: ' + JSON.stringify(response.data.payload));   // DEBUG (RAB)
        saved_itineraries = response.data.payload;
        console.log('saved_itineraries: ' + JSON.stringify(saved_itineraries)); // DEBUG (RAB)
        this.setState({saved : true})
      })
      .catch(err => {
        this.setState({
        });        
      })
  }

  render() {
    const saved = this.state.saved;
    if (!saved) {
      return <div>Loading.......</div>;
    }
    return (
      <div className='dashboard'>
        <h3>Dashboard</h3>
        <div className='col-md-9'>
          <h4><strong>Your Previously saved Itineraries</strong></h4>
          <ul className="itineraries">
            {saved_itineraries.map(saved_itins => 
            <li>
              <span className="badge">{saved_itins.type}</span>
              {saved_itins.name} {saved_itins.price_level} {saved_itins.rating} {saved_itins.vicinity}
            </li>
            )}
          </ul>
        </div>
        <div className='col-md-3'>
          <h2>Select a Country:</h2>
          <form action='/tripbuild'>
            <div className='dashradio'>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio1' />
                <label for='radio1'>England</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio2' />
                <label for='radio2'>France</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio3' />
                <label for='radio3'>Germany</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio4' />
                <label for='radio4'>Italy</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio5' />
                <label for='radio5'>Spain</label>
              </div>
              <div className='dashradio-item'>
                <input type='radio' name='radio' id='dashradio6' />
                <label for='radio6'>Netherlands</label>
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

const mapStatetoProps = state => ({});

export default connect(mapStatetoProps)(Dashboard);