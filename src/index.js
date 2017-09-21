<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';
import { AUTH_USER} from './actions/types';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state to authenticated=true
  store.dispatch({ type: AUTH_USER });
};

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
  , document.getElementById('root'));
=======

import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import ReactDOM from 'react-dom';
import GoogleApiWrapper from './components/map';
import Places from './components/places';
import Autocomplete from 'react-google-autocomplete';
import rootReducer from './reducers';
import {Provider, connect} from 'react-redux';
import {createStore, bindActionCreators} from 'redux';
import {insertMap, locationClicked} from './actions/actions';



const store = createStore(rootReducer, window.STATE_FROM_SERVER);

class Main extends Component{
    render(){
            //For the default center of map
        const location = {
            lat:40.7575285,
            lng:-73.9884469
        };
        console.log("APP.JS RUNNING");

        return(
            <div>
            <Autocomplete style={{width:'90%'}} 
                onPlaceSelected={(place) => {

                    var selectedlatlong = place.geometry.location.toString();
                    var selLat = "";
                    var selLng = "";
                    var onlng = false;
                    
                    console.log(place);
                    console.log(selectedlatlong[1]);
                    for (var i =0; i < selectedlatlong.length; i++){
                        if(onlng === false){
                        if ( i !== 0 && selectedlatlong[i] !== ',' ){
                            selLat = selLat.concat(selectedlatlong[i]);
                        } else if (selectedlatlong[i] === ','){
                            onlng = true;
                        }
                        } // end first if 
                           else if(onlng === true && selectedlatlong[i] !== ')' && selectedlatlong[i] !== ' '){
                                selLng = selLng.concat(selectedlatlong[i]);
                            }
                        } // end for loop
                        console.log(selectedlatlong);
                        console.log("Lat = "  + selLat + " || Lng =" + selLng);

                        store.dispatch(insertMap(selLat, selLng));
                        console.log(store.getState());
                        store.dispatch(locationClicked());
                        console.log(store.getState().maps.selectedLocation.lat);
                        
                    }
                   
                }  // end onPlaceSelected
                types={['(regions)']}
                />
            
                <h1> Hi im working </h1>
                <div style={{width:300, height:600}}>
                    <GoogleApiWrapper 
                        centerAroundCurrentLocation={false}
                        mapCenter={{lat: store.getState().maps.selectedLocation.lat, lng: store.getState().maps.selectedLocation.lng} } 
                          />
                </div>
            </div>
        );
    };
};




ReactDOM.render(
    <Provider store={store}>
    <Main /> 
    </Provider>, document.getElementById('root'));






/*
WORKING MAP

import React from 'react';
import ReactDOM from 'react-dom';

import {Map, GoogleApiWrapper} from 'google-maps-react';

const Container = React.createClass({
  getInitialState: function() {
    return {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  },

  onMapMoved: function(props, map) {
    const center = map.center;
  },

  onMarkerClick: function(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  },

  onInfoWindowClose: function() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  },

  onMapClicked: function(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  },

  render: function() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <Map google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}
          containerStyle={{}}
          centerAroundCurrentLocation={true}
          onClick={this.onMapClicked}
          onDragend={this.onMapMoved} />
    )
  }
});

export default GoogleApiWrapper({apiKey: ('AIzaSyATw__BDGJjYl8e825Yu4y2rRKCeUYc6KM')})(Container)



*/
>>>>>>> 26068a924bfbab0cd76918baf4746fd05922ed1c
