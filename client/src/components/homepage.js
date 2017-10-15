import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DefaultPlayer as Video } from 'react-html5video';
import * as actions from '../actions';
import PropTypes from 'prop-types';

class Homepage extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount () {
    this.props.fetchMessage()
  };

  renderLinks () {
    if (this.props.authenticated) {
      // show a link for user to go to Dashboard or Sign Out
      return [
        <li className='nav-item' key={1}>{this.props.message}
        </li>
        ,
        <li className='nav-item' key={2}>
          <Link className='btn btn-default tg-login__btn' to='/dashboard'>Dashboard</Link>
        </li>
        ,
        <li className='nav-item' key={3}>
          <Link className='nav-link' to='/signout'>Sign Out</Link>
        </li>
      ];
    } else {
      // show a link for user to Sign In or Sign Up
      return [
        <li className='nav-item'>
          <Link className='btn btn-default tg-login__btn' to='/signin' key={1}>Sign In</Link>
        </li>
        ,
        <li className='nav-item' key={2}>
          <Link className='btn btn-default tg-login__btn' to='/signup'>Sign Up</Link>
        </li>
      ];
    }
  };

  render () {
    return (
      <div className='tg-header'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
              <strong>App Name Here</strong></a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
                <li><a href="#">Tab 2</a></li>
                <li><a href="#">Tab 3</a></li>

              </ul>
              <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
              </ul>
            </div>
          </div>
        </nav>



        <footer className='page-footer center-on-small-only'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-3 col-md-6 ml-auto'>
                <h5 className='title mb-3'><strong>About Us</strong></h5>
                <p>Designed by greatness.</p>
                <p>Designed for greatness.</p>
              </div>

              <hr className='w-100 clearfix d-sm-none' />

              <div className='col-lg-2 col-md-6 ml-auto'>
                <h5 className='title mb-3'><strong>First column</strong></h5>
                <ul>
                  <li><a href='#!'>Link 1</a></li>
                  <li><a href='#!'>Link 2</a></li>
                  <li><a href='#!'>Link 3</a></li>
                  <li><a href='#!'>Link 4</a></li>
                </ul>
              </div>

              <hr className='w-100 clearfix d-sm-none' />

              <div className='col-lg-2 col-md-6 ml-auto'>
                <h5 className='title mb-3'><strong>Second column</strong></h5>
                <ul>
                  <li><a href='#!'>Link 1</a></li>
                  <li><a href='#!'>Link 2</a></li>
                  <li><a href='#!'>Link 3</a></li>
                  <li><a href='#!'>Link 4</a></li>
                </ul>
              </div>

              <hr className='w-100 clearfix d-sm-none' />

              <div className='col-lg-2 col-md-6 ml-auto'>
                <h5 className='title mb-3'><strong>Third column</strong></h5>
                <ul>
                  <li><a href='#!'>Link 1</a></li>
                  <li><a href='#!'>Link 2</a></li>
                  <li><a href='#!'>Link 3</a></li>
                  <li><a href='#!'>Link 4</a></li>
                </ul>
              </div>
            </div>
          </div>

          <hr />

          <div className='call-to-action'>
            <h4>Guide Trip</h4>
            <ul>
              <li><h5>Sign Up For Free</h5></li>
              <li><a target='_blank' href='/' className='btn rounded waves-effect red' rel='nofollow'>Sign up!</a></li>
            </ul>
          </div>
          <div className='footer-copyright'>
            <div className='container-fluid'>
            © 2017 Copyright: <a href='#'> Dylan.me </a>
            </div>
          </div>
        </footer>
    </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated,
    message: state.auth.message
  };
};

export default connect(mapStateToProps, actions)(Homepage);
