import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authNav } from '../store/actions/authActions';


const ProtectedRoutes = ({
  component: Component,
  isAuthenticated,
  authenticate,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  authenticate: (nav, path) => dispatch(authNav(nav, path)),
});

ProtectedRoutes.propTypes = {
  component: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);
