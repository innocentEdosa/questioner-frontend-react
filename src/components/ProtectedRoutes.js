import React from 'react';
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
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);
