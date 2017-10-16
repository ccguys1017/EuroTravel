import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DefaultPlayer as Video } from 'react-html5video';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import {Col} from 'react-bootstrap';

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
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
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

        <div id='video-carousel-example2' className='carousel slide carousel-fade' data-ride='carousel'>
          <ol className='carousel-indicators'>
            <li data-target='#video-carousel-example2' data-slide-to='0' className='active'></li>
            
          </ol>

          <div className='carousel-inner' role='listbox'>
            <div className='carousel-item active'>
              <div className='view hm-purple-slight'>
                <Video className='video-full' controls autoPlay loop>
                    <source src='https://mdbootstrap.com/img/video/Tropical.mp4' type='video/mp4' />
                </Video>
                <div className='full-bg-img'></div>
              </div>
              <div className='carousel-caption'>
                <div className='flex-center animated fadeIn'>
                  <ul id="home" style={{"list-style-type": "none"}}>
                    <li><h1 className='h1-responsive'>Guide Trip</h1></li>
                    <li><p>Guide Trip is your final destination for all your travel needs</p></li>
                    
                    <div id="homeBTN">
                    <Col xs={4} md={6}>
                    <li ><a href='/signup' className='btn btn-primary rounded waves-effect' rel='nofollow'>Sign up!</a></li>
                    </Col>
                    <li ><a  href='/signin' className='btn btn-primary rounded waves-effect' rel='nofollow'>Log In!</a></li>
                    
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <a className='carousel-control-prev' href='#video-carousel-example2' role='button' data-slide='prev'>
          <span className='carousel-control-prev-icon' aria-hidden='true'></span>
          <span className='sr-only'>Previous</span></a>
          <a className='carousel-control-next' href='#video-carousel-example2' role='button' data-slide='next'>
          <span className='carousel-control-next-icon' aria-hidden='true'></span>
          <span className='sr-only'>Next</span></a>
        </div>

        <footer style={{position:"relative"}}id="sticky">
        
          <a href="/"> Home</a>
          <a href="/dashboard"> Dashboard</a>
          <a href="/hotelBuild"> Find Hotels</a>
        
        <div class="footer-copyright">
    <div class="container-fluid">
        © 2017 Copyright: <a href="/"> GuideTrip </a>

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
