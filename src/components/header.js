import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks () {
    if (this.props.authenticated) {
      // show a link for user to go to Dashboard or Sign Out
      return [
        <li className='nav-item' key={1}>
          <Link className='btn btn-default tg-login__btn' to='/dashboard'>Dashboard</Link>
        </li>
        ,
        <li className='nav-item' key={2}>
          <Link className='nav-link' to='/signout'>Sign Out</Link>
        </li>
      ];
    } else {
      // show a link for user to Sign In or Sign Up
      return [
        <li className='nav-item' key={1}>
          <Link className='btn btn-default tg-login__btn' to='/signin'>Sign In</Link>
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
              <strong>Guide Trip</strong></a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
                <li><a href="#">Trip Ideas</a></li>
                <li><a href="#">Destinations</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
              </ul>
            </div>
          </div>
        </nav>
        <div>
          <div className='full-bg-img'>
            <video className='video-full' autoplay loop>
              <source src='https://mdbootstrap.com/img/video/Tropical.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps)(Header);
