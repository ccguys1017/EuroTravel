import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
//import Main from './components/map';
import Autocomplete from 'react-google-autocomplete';

import PlacesSearch from './components/search';
class Main extends Component{
    state= {
        selectedLocation:{ lat: 0, lng: 0},
        clicked: false,
        placeid:""
    }
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
                        this.setState({selectedLocation: {lat: selLat, lng:selLng}})
                        this.setState({clicked: true})
                        
                        this.setState({placeid: place.place_id});
                        console.log(this.state.placeid);
                    }
                   
                }  // end onPlaceSelected
                types={['(regions)']}
                />
                {(this.state.clicked === true) ? <PlacesSearch selectedLocation= {this.state.selectedLocation} placeid={this.state.placeid} /> : <h2>Please select a location </h2> }
            
                <h1> Hi im working </h1>
                
            </div>
        );
    };
};

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
