import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import PropTypes from 'prop-types';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faStroopwafel,
  faThumbsUp,
  faThumbsDown,
  faCommentAlt
} from '@fortawesome/free-solid-svg-icons';
import Navigation from './Navigation';
import Home from './Home';
import LoginRedirect from './LoginRedirect';
import AuthLoginRedirect from './AuthLoginRedirect';
import Auth from './Auth';
import AllMeetup from './AllMeetup';
import Admin from './Admin';
import Meetup from './Meetup';
import ProtectedRoutes from '../components/ProtectedRoutes';
import ProtectedAdminRoutes from '../components/ProtectedAdminRoutes';
import Loader from '../components/Loader';
import { verifyUser } from '../store/actions/authActions';

library.add(fab, faCommentAlt, faStroopwafel, faThumbsUp, faThumbsDown);

const NotFound = () => <div>this page is nof fo</div>;
const App = ({ onVerifyUser, verifyingUser }) => {
  useEffect(() => {
    onVerifyUser();
  }, []);

  return (
    <div>
      {(!verifyingUser)
        ? (
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LoginRedirect} />
              <Route path="/adminLogin" component={AuthLoginRedirect} />
              <Route path="/Auth" component={Auth} />
              <ProtectedAdminRoutes path="/admin" component={Admin} />
              <ProtectedRoutes path="/meetups" component={AllMeetup} />
              <ProtectedRoutes path="/meetup/:id" component={Meetup} />
              <Route component={NotFound} />
            </Switch>
            {' '}
          </div>
        ) : <Loader />
  }

    </div>
  );
};

const mapStateToProps = state => ({
  verifyingUser: state.auth.verifyingUser
});

const mapDispatchToProps = dispatch => ({
  onVerifyUser: () => dispatch(verifyUser()),
});

App.propTypes = {
  verifyingUser: PropTypes.func.isRequired,
  onVerifyUser: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
