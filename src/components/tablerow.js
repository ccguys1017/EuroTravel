import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ItemService from './itemservice';

class TableRow extends Component {
    
      constructor(props) {
          super(props);
          this.addItemService = new ItemService();
          this.handleSubmit = this.handleSubmit.bind(this);

          this.state = {
            itin_deleted: false
          }
        }    
    
      handleSubmit(event) {
        event.preventDefault();
        this.addItemService.deleteData(this.props.obj._id);
        //alert('Your Itinerary item has been deleted! Reload dashboard to update saved itinerary list.');
      }

      render() {
        return (
            <tr>
              <td><strong><span className="badge">{this.props.obj.country}</span></strong></td>
              <td><span className="badge">{this.props.obj.type}</span>
              </td>
              <td>
              <strong>{this.props.obj.name}</strong> <br/>{this.props.obj.vicinity}
              </td>
              <td>
                <form onSubmit={this.handleSubmit}>
                  <input type="submit" value="Delete" className="btn btn-warning"/>
                </form>
              </td>
            </tr>
        );
      }
    }
    
    export default TableRow;
