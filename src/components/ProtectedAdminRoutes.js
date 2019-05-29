import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { adminAuth } from '../store/actions/authActions';


const ProtectedAdminRoutes = ({
  component: Component,
  isAuthenticated,
  authenticate,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated && (user.isAdmin === 'TRUE')) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/adminLogin', state: { from: props.location } }} />;
    }
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  authenticate: (nav, path) => dispatch(adminAuth(nav, path)),
});

ProtectedAdminRoutes.propTypes = {
  component: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  authenticate: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedAdminRoutes);
