/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
import Checkbox from './checkbox';
import axios from 'axios';

const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/api/v1';
class manualSearch extends React.Component{
    constructor(props){
        super(props)
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
        this.props.wipePlaces(); // to reset the places per search
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

  onClick () {

    this.context.router.history.push('/dashboard');
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
    componentDidMount() {
      console.log(this.props);
        let location = {lat:Number(this.props.state.maps.selectedLocation.lat), lng: Number(this.props.state.maps.selectedLocation.lng)};
        console.log('location: ' + location);
        let map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom:15
        });
        
        let test_places = [];
        
        let service = new google.maps.places.PlacesService(map);
        console.log(this.props);
        let searchTypes = this.props.state.maps.searchTypes;
        let props = this.props;
        for (let x=0; x < searchTypes.length; x++){
          service.nearbySearch({
            location:location,
            radius: 500,                
            type: [searchTypes[x]]            // DEBUG (DEJ)
            
          }, function(results, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (let i =0; i < results.length; i++) {
                  createMarker(results[i], x);
                  props.addPlace(results[i]);
                  //store.addPlace(results[i]);
                  
        
                }
                
                console.log(props);
        
                //onsole.log('results: ' + JSON.stringify(results));
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
          let markerColor = '/png/blue_markerA.png';

          let placeLoc = place.geometry.location;   // DEBUG (RAB) Capture Places data
          let placeName = place.name;               // DEBUG (RAB) Capture Places data
          let placeType = place.types[0];           // DEBUG (RAB) Capture Places data
          let placeAddr = place.vicinity;           // DEBUG (RAB) Capture Places data
          let placeRating = place.rating;           // DEBUG (RAB) Capture Places data
          console.log('place: ' + place);                       // DEBUG (RAB) Capture Places data

          switch (placeType) {
            case 'store':
              markerColor = '/static/js/png/blue_MarkerA.png';
              break;
            case 'lodging':
              markerColor = '/static/js/png/brown_MarkerB.png';
              break;
            case 'cafe':
              markerColor = '/static/js/png/darkgreen_MarkerC.png';
              break;
            case 'museum':
              markerColor = '/static/js/png/green_MarkerD.png';
              break;
            case 'pharmacy':
              markerColor = '/static/js/png/orange_MarkerE.png';
              break;
            case 'subway_station':
              markerColor = '/static/js/png/paleblue_MarkerF.png';
              break;
            case 'airport':
              markerColor = '/static/js/png/pink_MarkerG.png';
              break;
            case 'hospital':
              markerColor = '/static/js/png/purple_MarkerH.png';
              break;
            case 'bus_station':
              markerColor = '/static/js/png/red_MarkerI.png';
              break;
            case 'park':
              markerColor = '/static/js/png/yellow_MarkerJ.png';
              break;
            case 'atm':
              markerColor = '/static/js/png/blue_MarkerK.png';
              break;
            case 'bank':
              markerColor = '/static/js/png/brown_MarkerL.png';
              break;
            case 'doctor':
              markerColor = '/static/js/png/darkgreen_MarkerM.png';
              break;
            case 'zoo':
              markerColor = '/static/js/png/green_MarkerN.png';
              break;
            case 'police':
              markerColor = '/static/js/png/orange_MarkerO.png';
              break;
            case 'train_station':
              markerColor = '/static/js/png/paleblue_MarkerP.png';
              break;
            case 'school':
              markerColor = '/static/js/png/pink_MarkerQ.png';
              break;
            case 'bar':
              markerColor = '/static/js/png/purple_MarkerR.png';
              break;
            case 'church':
              markerColor = '/static/js/png/red_MarkerS.png';
              break;
            case 'synagogue':
              markerColor = '/static/js/png/yellow_MarkerT.png';
              break;
            case 'mosque':
              markerColor = '/static/js/png/blue_MarkerU.png';
              break;
            case 'university':
              markerColor = '/static/js/png/brown_MarkerV.png';
              break;
            case 'embassy':
              markerColor = '/static/js/png/darkgreen_MarkerW.png';
              break;
            case 'library':
              markerColor = '/static/js/png/green_MarkerX.png';
              break;
            case 'spa':
              markerColor = '/static/js/png/orange_MarkerY.png';
              break;
            default:
              markerColor = 'static/js/components/png/paleblue_MarkerZ.png';
              //markerColor = 'https://www.dropbox.com/s/si40udyyzt0nzds/paleblue_MarkerZ.png?dl=0';
          };
  

          let infowindow = new google.maps.InfoWindow();
          let marker = new google.maps.Marker({
            map: map,
            //icon: markerColor[x],
            icon: markerColor,
            position: place.geometry.location
          });
          google.maps.event.addListener(marker, 'click', function() {
            console.log(place);
            infowindow.close();
            infowindow.setContent('<div><strong>' + placeName + '</strong><br>' +
            'Place Type: ' + placeType + '<br>' +
            placeAddr + '</div>');
            
            infowindow.open(map, this);
            x +=1;
            if (x ===2){
              infowindow.close();  //closes the window after user clicks twice (x is the counter)
              x = 0;
            }
          });
          
        }; // end create marker
        
        }
        render(){
            return(
              <div className="tripresults">
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
            <form action='/dashboard' onSubmit={this.handleFormSubmit}>
            <ListGroup>
              {this.createCheckboxes()}
            </ListGroup>
              <button className="btn btn-default" type="submit">Click to Save checked Itineraries</button>
            </form>
            <button onClick={this.onClick.bind(this)} className='btn btn-default'>Dashboard</button> 
          </div>
        </div>
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
      manualSearch = connect(mapStateToProps, mapDispatchToProps)(manualSearch);
      
      export default manualSearch;

    


