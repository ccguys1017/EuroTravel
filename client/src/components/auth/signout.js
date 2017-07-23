import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'

class Signout extends Component {
  componentWillMount () {
    this.props.signoutUser()
  }

  render () {
    return <div>Sorry to see you go...</div>
  }
}

export default withRouter(connect(null, actions)(Signout))
