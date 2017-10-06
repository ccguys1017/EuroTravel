import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

class Signout extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  
  componentWillMount () {
    this.props.signoutUser();
    this.context.router.history.push('/');
  }
};

export default connect(null, actions)(Signout);
