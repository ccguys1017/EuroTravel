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
            //markerColor = '/png/blue_markerA.png';
            markerColor = 'https://www.dropbox.com/s/pl0x77jq9a3tgow/blue_MarkerA.png?dl=0';
            break;
          case 'lodging':
            //markerColor = '/png/brown_markerB.png';
            markerColor = 'https://www.dropbox.com/s/mf30cqgcqe9iqia/brown_MarkerB.png?dl=0';
            break;
          case 'cafe':
            //markerColor = '/png/darkgreen_markerC.png';
            markerColor = 'https://www.dropbox.com/s/fvdkh0qphzxqqyq/darkgreen_MarkerC.png?dl=0';
            break;
          case 'museum':
            //markerColor = '/png/green_markerD.png';
            markerColor = 'https://www.dropbox.com/s/7xsn2tjeiy5lov3/green_MarkerD.png?dl=0';
            break;
          case 'pharmacy':
            //markerColor = '/png/orange_markerE.png';
            markerColor = 'https://www.dropbox.com/s/rgjuu3bcxipbarm/orange_MarkerE.png?dl=0';
            break;
          case 'subway_station':
            //markerColor = '/png/paleblue_markerF.png';
            markerColor = 'https://www.dropbox.com/s/f1xeir6pt5sq3er/paleblue_MarkerF.png?dl=0';
            break;
          case 'airport':
            //markerColor = '/png/pink_markerG.png';
            markerColor = 'https://www.dropbox.com/s/hj1g0596frd4s5a/pink_MarkerG.png?dl=0';
            break;
          case 'hospital':
            //markerColor = '/png/purple_markerH.png';
            markerColor = 'https://www.dropbox.com/s/3pra0v2l9jlzyem/purple_MarkerH.png?dl=0';
            break;
          case 'bus_station':
            //markerColor = '/png/red_markerI.png';
            markerColor = 'https://www.dropbox.com/s/s92gw8uyfa7s38t/red_MarkerI.png?dl=0';
            break;
          case 'park':
            //markerColor = '/png/yellow_markerJ.png';
            markerColor = 'https://www.dropbox.com/s/7v0ele13cmxzgzl/yellow_MarkerJ.png?dl=0';
            break;
          case 'atm':
            //markerColor = '/png/blue_markerK.png';
            markerColor = 'https://www.dropbox.com/s/bdmuyza6gs4b3s2/blue_MarkerK.png?dl=0';
            break;
          case 'bank':
            //markerColor = '/png/brown_markerL.png';
            markerColor = 'https://www.dropbox.com/s/3wap321spjqf0fk/brown_MarkerL.png?dl=0';
            break;
          case 'doctor':
            //markerColor = '/png/darkgreen_markerM.png';
            markerColor = 'https://www.dropbox.com/s/wdb3at4a4wnca0g/darkgreen_MarkerM.png?dl=0';
            break;
          case 'zoo':
            //markerColor = '/png/green_markerN.png';
            markerColor = 'https://www.dropbox.com/s/rfgklz888rk7ht0/green_MarkerN.png?dl=0';
            break;
          case 'police':
            //markerColor = '/png/orange_markerO.png';
            markerColor = 'https://www.dropbox.com/s/i17r3a3862awvhj/orange_MarkerO.png?dl=0';
            break;
          case 'train_station':
            //markerColor = '/png/paleblue_markerP.png';
            markerColor = 'https://www.dropbox.com/s/fbhqalsip8bo8yr/paleblue_MarkerP.png?dl=0';
            break;
          case 'school':
            //markerColor = '/png/pink_markerQ.png';
            markerColor = 'https://www.dropbox.com/s/x6o5dw6c4id35p8/pink_MarkerQ.png?dl=0';
            break;
          case 'bar':
            //markerColor = '/png/purple_markerR.png';
            markerColor = 'https://www.dropbox.com/s/xrt6le6ek6sv6h5/purple_MarkerR.png?dl=0';
            break;
          case 'church':
            //markerColor = '/png/red_markerS.png';
            markerColor = 'https://www.dropbox.com/s/cv2stohbta1u2ev/red_MarkerS.png?dl=0';
            break;
          case 'synagogue':
            //markerColor = '/png/yellow_markerT.png';
            markerColor = 'https://www.dropbox.com/s/ecejo0h8905wnl3/yellow_MarkerT.png?dl=0';
            break;
          case 'mosque':
            //markerColor = '/png/blue_markerU.png';
            markerColor = 'https://www.dropbox.com/s/9zoqlsm2i1sixm1/blue_MarkerU.png?dl=0';
            break;
          case 'university':
            //markerColor = '/png/brown_markerV.png';
            markerColor = 'https://www.dropbox.com/s/o5gxzh19mr1lf0t/brown_MarkerV.png?dl=0';
            break;
          case 'embassy':
            //markerColor = '/png/darkgreen_markerW.png';
            markerColor = 'https://www.dropbox.com/s/l1rfp9l42yxvpy5/darkgreen_MarkerW.png?dl=0';
            break;
          case 'library':
            //markerColor = '/png/green_markerX.png';
            markerColor = 'https://www.dropbox.com/s/nfaj7szlllxset4/green_MarkerX.png?dl=0';
            break;
          case 'spa':
            //markerColor = '/png/orange_markerY.png';
            markerColor = 'https://www.dropbox.com/s/jyh78wo71qfn824/orange_MarkerY.png?dl=0';
            break;
          default:
            //markerColor = 'markerColor = '/png/paleblue_markerZ.png';
            markerColor = 'https://www.dropbox.com/s/si40udyyzt0nzds/paleblue_MarkerZ.png?dl=0';
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

    


