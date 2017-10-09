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
        this.setState({itin_deleted : true});
      }

      render() {
        return (
            <tr>
              <td><span className="badge">{this.props.obj.type}</span>
              </td>
              <td>
                {this.props.obj.name} <br/>{this.props.obj.vicinity}
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
    

    /*

              <td>
                {this.props.obj.photo}
              </td>
    */