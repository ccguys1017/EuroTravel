import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ItemService from './itemservice';
import PropTypes from "prop-types";

import axios from 'axios';

const ROOT_URL = 'https://eurotravel-sever.herokuapp.com/api/v1';

let place_revisited = [];
let place_retrieved = false;
let revisited_lat = 0;
let revisited_lng = 0;
let revisited_placeId = '';
let revisited_type = '';
let revisited_city = '';
let revisited_country = '';

class TableRow extends Component {
    
      constructor(props) {
          super(props);
          this.addItemService = new ItemService();
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleRevisitSubmit = this.handleRevisitSubmit.bind(this);

          this.state = {
            itin_deleted: false
          }
        }    

        static contextTypes = {
          router: PropTypes.object
        };
    
      handleSubmit(event) {
        event.preventDefault();
        this.addItemService.deleteData(this.props.obj._id);
        //alert('Your Itinerary item has been deleted! Reload dashboard to update saved itinerary list.');
      }

      handleRevisitSubmit(event) {
        event.preventDefault();
        //this.addItemService.findPlace(this.props.obj._id);
        let id = this.props.obj._id;
        axios.post(`${ROOT_URL}/get_place/`+id)
          .then(response => {
            revisited_lat = JSON.stringify(response.data.place.lat);
            revisited_lng = JSON.stringify(response.data.place.lng);
            revisited_placeId = response.data.place.place_id;
            revisited_type = response.data.place.type;
            revisited_city = response.data.place.city;
            revisited_country = response.data.place.country;
      
            localStorage.setItem("revisited_lat", revisited_lat);
            localStorage.setItem("revisited_lng", revisited_lng);
            localStorage.setItem("revisited_placeid", revisited_placeId);
            localStorage.setItem("revisited_type", revisited_type);
            localStorage.setItem("revisited_city", revisited_city);
            localStorage.setItem("revisited_country", revisited_country);
            this.context.router.history.push("/revisitPlace");
          })
      }

      render() {
        return (
            <tr>
              <td><strong><span className="badge">{this.props.obj.country}, {this.props.obj.city}</span></strong></td>
              <td><span className="badge">{this.props.obj.type}</span>
              </td>
              <td>
              <strong>{this.props.obj.name}</strong> <br/>{this.props.obj.vicinity}
              </td>
              <td>
                <form onSubmit={this.handleRevisitSubmit}>
                  <input type="submit" value="Revisit" className="btn btn-primary"/>
                </form>
                </td>
              <td>
                <form onSubmit={this.handleSubmit}>
                  <input type="submit" value="Delete" className="btn btn-danger"/>
                </form>
              </td>
            </tr>
        );
      }
    }
    
    export default TableRow;
