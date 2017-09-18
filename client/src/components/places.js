import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Places extends Component {
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
        <h3>Explore Your World</h3>
        <form action='/dashboard'>

        </form>
        <button onClick={this.onClick.bind(this)} className='btn btn-default'>Back</button>
      </div>
    );
  }
}

const mapStatetoProps = state => ({});

export default connect(mapStatetoProps)(Places);