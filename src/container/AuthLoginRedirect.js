import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { adminAuth } from '../store/actions/authActions';


const AuthLoginRedirect = ({ location, authenticate }) => {
  const path = location.state.from.pathname;
  useEffect(() => {
    authenticate('login', path);
  });
  return <Redirect to="/" />;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = dispatch => ({
  authenticate: (nav, path) => dispatch(adminAuth(nav, path))
});

AuthLoginRedirect.propTypes = {
  location: PropTypes.shape({}).isRequired,
  authenticate: PropTypes.shape.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginRedirect);
