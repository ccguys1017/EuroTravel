import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import Feature from './feature';
import RequireAuth from './auth/require_auth';
import Header from './header';
import Dashboard from './dashboard';
import Tripbuild from './tripbuild';
import Tripresults from './tripresults';
import Places from './places';

export default class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Header} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/signout' component={Signout} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/places' component={Places} />          
          <Route path='/tripbuild' component={Tripbuild} />
          <Route path='/tripresults' component={Tripresults} />
          <Route path='/feature' component={RequireAuth(Feature)} />
        </div>
      </Router>
    );
  }
};
