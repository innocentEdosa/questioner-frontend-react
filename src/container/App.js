import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import Login from './Login';
import Auth from './Auth';
import AllMeetup from './AllMeetup';
import Admin from './Admin';
import Meetup from './Meetup';

const NotFound = () => (<div>this page is nof fo</div>);
const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/Auth" component={Auth} />
      <Route path="/admin" component={Admin} />
      <Route exact path="/meetups" component={AllMeetup} />
      <Route path="/meetup/:id" component={Meetup} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default connect()(App);
