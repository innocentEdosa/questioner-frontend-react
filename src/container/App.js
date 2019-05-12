import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../components/Home';

import Login from './Login';
import Auth from './Auth';


const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/Auth" component={Auth} />
    </Switch>
  </div>
);

export default connect()(App);
