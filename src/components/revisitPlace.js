/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';

class revisitPlace extends React.Component{
    constructor(props){
        super(props);

    }

    static contextTypes = {
      router: PropTypes.object
    };

    componentDidMount() {
        let location = {lat:Number(localStorage.getItem("revisited_lat")), lng: Number(localStorage.getItem("revisited_lng"))};
        console.log('location: ' + location);
        let map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom:15
        });
        
        let test_places = [];
        
        let service = new google.maps.places.PlacesService(map);
        let searchTypes = localStorage.getItem("revisited_type");
        let props = this.props;
 
        service.getDetails({
          placeId: localStorage.getItem("revisited_placeid")
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            console.log('revisited place: ' + place);          
            createMarker(place);
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
        localStorage.setItem("revisited_lat", 0);
        localStorage.setItem("revisited_lng", 0);
        localStorage.setItem("revisited_placeid", '');
        localStorage.setItem("revisited_type", '');
        }
        render(){

          const cb_city = localStorage.getItem('revisited_city');
          const cb_country = localStorage.getItem('revisited_country');    


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
    <h3 style={{textAlign: "center"}}><strong>Your Custom Itinerary Results for: </strong><span>{ cb_city}, {cb_country}</span></h3>
        <h4 style={{textAlign: "center"}}><strong>Marker Legend</strong></h4>
        <div className='row1'>
          <div className='col-md-12 columns'>
          <div className='col-md-2 columns'>
            </div>
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
            </div>
            <div className='col-md-12 columns'>
          <div className='col-md-5 columns'>
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

revisitPlace = connect(mapStateToProps, mapDispatchToProps)(revisitPlace);
      
export default revisitPlace;
