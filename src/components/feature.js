import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';

class Feature extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount () {
    this.props.fetchMessage()
  };

  render () {
    return (
      <div>{this.props.message}</div>
    );
  }
};

function mapStateToProps (state) {
  return { message: state.auth.message }
};

export default connect(mapStateToProps, actions)(Feature);
