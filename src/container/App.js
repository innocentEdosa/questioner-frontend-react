import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Auth from './Auth';
import AllMeetup from './AllMeetup';
import Admin from './Admin';

const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/Auth" component={Auth} />
      <Route path="/admin" component={Admin} />
      <Route path="/meetups" component={AllMeetup} />
    </Switch>
  </div>
);

export default connect()(App);
