import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Tripbuild extends Component {
  constructor(props) {
    super(props);
  }    
  state = {};

  static contextTypes = {
    router: PropTypes.object
  };

 onClick () {
    this.context.router.history.push('/dashboard');
  }

  render() {
    return ( 
      <div className='tripbuild'>
        <h3>Create Your Custom Itinerary</h3>
        <form action='/scratchpad'>
          <div className='form-group'>
            <label className='col-md-3 control-label' for='Checkboxes'>Check your Itinerary Items</label>  
            <div className='col-md-9 columns'>
              <div className='col-md-4 columns'>
                <label className='checkbox-inline' for='Checkboxes_col-1'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-1' value='item-1' />Item 1
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-1'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-2' value='item-2' />Item 2
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-1'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-3' value='item-3' />Item 3
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline' for='Checkboxes_col-2'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-1' value='item-1' />Item 1
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-2'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-2' value='item-2' />Item 2
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-2'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-3' value='item-3' />Item 3
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline' for='Checkboxes_col-3'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-1' value='item-1' />Item 1
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-3'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-2' value='item-2' />Item 2
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-3'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-3' value='item-3' />Item 3
                </label>
              </div>
              <div className='col-md-4 columns'>
                <label className='checkbox-inline' for='Checkboxes_col-1'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-1' value='item-1' />Item 1
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-1'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-2' value='item-2' />Item 2
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-1'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-3' value='item-3' />Item 3
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline' for='Checkboxes_col-2'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-1' value='item-1' />Item 1
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-2'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-2' value='item-2' />Item 2
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-2'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-3' value='item-3' />Item 3
                </label>
                </div>
                <div className='col-md-4 columns'>
                <label className='checkbox-inline' for='Checkboxes_col-3'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-1' value='item-1' />Item 1
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-3'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-2' value='item-2' />Item 2
                </label>
                <label className='checkbox-inline' for='Checkboxes_col-3'>
                    <input type='checkbox' name='Checkboxes' id='Checkboxes_item-3' value='item-3' />Item 3
                </label>
              </div>
            </div>
          </div>
          <button className='btn btn-default' type='submit'>Click to Generate Itinerary</button>
        </form>
        <button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>
      </div>
    );
  }
}

const mapStatetoProps = state => ({});

export default connect(mapStatetoProps)(Tripbuild);