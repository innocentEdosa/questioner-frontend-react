import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { authNav } from '../store/actions/authActions';


const LoginRedirect = ({ location, authenticate }) => {
  const path = location.state.from.pathname;
  useEffect(() => {
    authenticate('login', path);
  });
  return <Redirect to="/Auth" />;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = dispatch => ({
  authenticate: (nav, path) => dispatch(authNav(nav, path))
});

LoginRedirect.propTypes = {
  location: PropTypes.shape({}).isRequired,
  authenticate: PropTypes.shape.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginRedirect);
