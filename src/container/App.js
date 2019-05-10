import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Home from '../components/Home';
import Login from './Login';
import Signup from './Signup';


const App = () => (
  <div>
    <Navigation />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </div>
);

export default connect()(App);
