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
            <li data-target='#video-carousel-example2' data-slide-to='1'></li>
            <li data-target='#video-carousel-example2' data-slide-to='2'></li>
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
                  <ul>
                    <li><h1 className='h1-responsive'>Guide Trip</h1></li>
                    <li><p>Guide Trip is your final destination for all your travel needs</p></li>
                    <li><a target='_blank' href='/' className='btn btn-primary rounded waves-effect' rel='nofollow'>Sign up!</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='carousel-item'>
              <div className='view hm-blue-slight'>
                <Video className='video-full' controls autoPlay loop>
                    <source src='https://mdbootstrap.com/img/video/Lines.mp4' type='video/mp4' />
                </Video>
                <div className='mask'></div>
              </div>
              <div className='carousel-caption'>
                <div className='flex-center animated fadeInDown'>
                  <ul>
                    <li><h1 className='h1-responsive'>Guide Trip does all the work in no time</h1></li>
                    <li><p>Your Vacation No Worries!</p></li>
                    <li><a target='_blank' href='https://mdbootstrap.com/bootstrap-tutorial/' className='btn btn-primary rounded waves-effect' rel='nofollow'>Start learning</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='carousel-item'>
              <div className='view hm-black-light'>
                <Video className='video-full' controls autoPlay loop>
                    <source src='https://mdbootstrap.com/img/video/forest.mp4' type='video/mp4' />
                </Video>
                <div className='mask'></div>
              </div>
              <div className='carousel-caption'>
                <div className='flex-center animated fadeInDown'>
                  <ul>
                    <li><h1 className='h1-responsive'>Sign Up Now For Free</h1></li>
                    <li><p>Vacation...You Deserve It</p></li>
                    <li><a target='_blank' href='https://mdbootstrap.com/forums/forum/support/' className='btn btn-default btn-lg' rel='nofollow'>Support forum</a></li>
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

        <footer className='page-footer center-on-small-only'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-lg-3 col-md-6 ml-auto'>
                <h5 className='title mb-3'><strong>About Guide Trip</strong></h5>
                <p>Guide Trip is designed by 6 awesome guys.</p>
                <p>We did all the work so you don’t have to.</p>
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
            © 2017 Copyright: <a href='https://www.guidetrip.me'> guidetrip.me </a>
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
