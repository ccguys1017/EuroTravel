import React from 'react';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import Autocomplete from 'react-google-autocomplete';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';

class hotelBuild extends React.Component{
    constructor(props){
        super(props)
    }
    static contextTypes = {
        router: PropTypes.object
      };
    render(){
        return(
            <div>
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
<Autocomplete style={{width:'66%'}} 
          onPlaceSelected={(place) => {

          let selectedlatlong = place.geometry.location.toString();
          let selLat = '';
          let selLng = '';
          let onlng = false;  

          //console.log('selectedlatlong: ' + selectedlatlong);
          //console.log('selectedlatlong.length: ' + selectedlatlong.length);
          for (let i =0; i < selectedlatlong.length; i++) {
            if(onlng === false) {
              if ( i !== 0 && selectedlatlong[i] !== ',' ) {
                selLat = selLat.concat(selectedlatlong[i]);
              } else if (selectedlatlong[i] === ',') {
                onlng = true;
              }
            } else if(onlng === true && selectedlatlong[i] !== ')' && selectedlatlong[i] !== ' ') {
              selLng = selLng.concat(selectedlatlong[i]);
            }
          } // end for loop
          //console.log('selectedlatlong: ' + selectedlatlong);
          //console.log('Lat = '  + selLat + ' || Lng = ' + selLng);
          this.props.addLocation(selLat, selLng, place.place_id);
          console.log(this.props);
          console.log(place);
          localStorage.setItem('sel_city', place.address_components[0].long_name);
          localStorage.setItem('sel_country', place.address_components[3].short_name);

          localStorage.setItem('trip_lat', place.address_components[0].long_name);
          localStorage.setItem('trip_lng', place.address_components[3].short_name);
          this.context.router.history.push('/hotelSearch');
         
        
          

          }}  // end onPlaceSelected
          types={['(regions)']}
        />
        <footer id="sticky">
            
              <a href="/"> Home</a>
              <a href="/dashboard"> Dashboard</a>
              <a href="/hotelBuild"> Find Hotels</a>
            
            <div class="footer-copyright">
        <div class="container-fluid">
            © 2017 Copyright: <a href="/"> GuideTrip </a>

        </div>
    </div>
      </footer>
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
  hotelBuild = connect(mapStateToProps, mapDispatchToProps)(hotelBuild);
  export default hotelBuild;