import React from 'react';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import Autocomplete from 'react-google-autocomplete';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';

class hotelBuild extends React.Component {
    constructor(props){
        super(props)
    }

    static contextTypes = {
        router: PropTypes.object
      };

    render(){
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
            <div>
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

  <div className='col-md-5'>
      </div>
      <div className='col-md-6'>
      <h4><strong>Search the World for a Hotel!</strong></h4>
      <Autocomplete style={{width:'35%'}} 
          onPlaceSelected={(place) => {

          let selectedlatlong = place.geometry.location.toString();
          let selLat = '';
          let selLng = '';
          let onlng = false;  

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

          this.props.addLocation(selLat, selLng, place.place_id);
          console.log(this.props);
          console.log(place);
          localStorage.setItem('sel_city', place.address_components[0].long_name);
          localStorage.setItem('sel_country', place.address_components[2].long_name)  // length = 3

          if (place.address_components.length > 3) {
            localStorage.setItem('sel_country', place.address_components[3].long_name);
          } else if (place.address_components.length < 3) {
            localStorage.setItem('sel_country', place.address_components[2].short_name);
          }
          localStorage.setItem('latitude',selLat );
              localStorage.setItem('longitude', selLng);
          localStorage.setItem('trip_lat', selLat);
          localStorage.setItem('trip_lng', selLng);
          localStorage.setItem('hotel_flag', false);
          this.context.router.history.push('/hotelSearch');
          }}  // end onPlaceSelected
          types={['(regions)']}
        />
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

hotelBuild = connect(mapStateToProps, mapDispatchToProps)(hotelBuild);

export default hotelBuild;