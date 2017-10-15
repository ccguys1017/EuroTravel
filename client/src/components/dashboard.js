import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
// import Tripbuild from './tripbuild';

const ROOT_URL = 'http://localhost:8080/api/v1';

let saved_itineraries = [];

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   //Insert What you want for the state 
    //     // This component is also linked to your global redux state defined in reducers, and actions
    // };
  }    

  static contextTypes = {
    router: PropTypes.object
  };

  //Just a back button
  onBackClick () {
    this.context.router.history.push('/');
  }



  // componentDidMount() {
  //   const user_email = localStorage.getItem('userEmail');
  //   // // (RAB) send the user checkboxed itinerary data to the server to store the user-specific itinerary data in the DB 
  //   axios.post(`${ROOT_URL}/get_itin`, { user_email })
  //     .then(response => {
  //       // //How we got the saved itineraries for the user, you can do whatever you want here for your app to get things from the user to display when they log in
  //       // // saved_itineraries = response.data.payload;
  //       // // this.setState({itins_retrieved : true})
  //     })
  //     .catch(err => {
  //       //  //this.setState({itins_retrieved : false});        
  //     })
  // }

  render() {
  return (      
      <div className='dashboard'>
        <h3>Dashboard</h3>
        <div className='col-md-6'>
          {/* <h4><strong>Your Previously saved Itineraries</strong></h4>
          <ul className="itineraries">
            {saved_itineraries.map(saved_itins => 
            <li key={saved_itins.place_id}>
              <span className="badge">{saved_itins.type}</span>
              {saved_itins.name} {saved_itins.price_level} {saved_itins.rating} {saved_itins.vicinity} 
            </li>
            )}
          </ul> */}
          <h4>Welcome to the dashboard, you have logged in correctly :) </h4>
        </div>
        <div className='col-md-3'>
          <h2>Dylan Jackson is so cool haha</h2>
          
          {/* I left his here to show how to have a button to redirect someone somewhere. I had it to go to the places page, but you can use this to link any other page in your site here
              <form action='/places'>
            <button className='btn btn-default' type='submit'>
              Click to Manually Search Places
            </button>
            </form> */}
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