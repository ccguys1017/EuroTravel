import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Table, Nav, Navbar, NavItem} from 'react-bootstrap';


class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  //add the router object to this.context to allow for redirects
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.context.router.history.push('/');
      localStorage.setItem('userEmail', this.props.values.email);
    };
  };

  handleFormSubmit ({ email, password }) {
    // action creator dispatching creditionals to validate on server
    this.props.signinUser({ email, password });
  };

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    };
  };

  render () {
    const { handleSubmit, fields: { email, password }} = this.props;
    return (
      <div>
      <Navbar>
<Navbar.Header>
<Navbar.Brand>
<a href="/">GuideTrip</a>
</Navbar.Brand>
</Navbar.Header>
<Nav>
<NavItem eventKey={2} href="/">Home</NavItem>
</Nav>
</Navbar>
      <div className='tg-login__wrapper'>
      <div className='col-md-5'>
      </div>
      <div className='col-md-6'>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className='form-group'>
            <label><strong>Email:</strong></label>
            <input {...email} style={{width:'40%'}} className='form-control' placeholder='Enter email' />
          </fieldset>
          <fieldset className='form-group'>
            <label><strong>Password:</strong></label>
            <input {...password} style={{width:'40%'}} type='password' className='form-control' placeholder='Enter password' />
          </fieldset>
          {this.renderAlert()}
          <button action='submit' className='btn btn-primary'>Sign in</button>
        </form>
      </div>
      </div>
      </div>
    );
  };
};

function mapStateToProps (state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
};

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)
