/* eslint-disable semi */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import authFormValidator from '../helper/authFormValidator';
import { signUp, logIn, authNav } from '../store/actions/authActions';


const Auth = ({
  authType,
  loading,
  onSignUp,
  onLogIn,
  serverError,
  history,
  isAuthenticated,
  authRedirectPath,
  onNavClick
}) => {
  const [formInput, setFormInput] = useState({
    username: '',
    email: '',
    password: '',
    'password confirmation': '',
    formError: {}
  });
  const inputChangeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const changedFormInput = { ...formInput };
    changedFormInput[name] = value;
    setFormInput(changedFormInput);
  };

  const onBlurHandler = (event) => {
    const check = authFormValidator(event.target.name, formInput);
    const changedFormInput = { ...formInput };
    changedFormInput.formError = {
      ...check
    };
    setFormInput(changedFormInput);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (Object.keys(formInput.formError).length === 0) {
      const { username, email, password } = formInput;
      if (authType === 'login') {
        onLogIn(email, password);
      } else {
        onSignUp(username, email, password);
      }
    }
  };

  if (isAuthenticated) {
    history.push(authRedirectPath);
  }

  const form = authType === 'signup' ? (
    <SignUpForm
      serverError={serverError}
      loading={loading}
      blur={onBlurHandler}
      submit={submitHandler}
      changed={inputChangeHandler}
      values={formInput}
      onNavClick={onNavClick}
    />
  ) : (
    <LoginForm
      serverError={serverError}
      loading={loading}
      blur={onBlurHandler}
      submit={submitHandler}
      values={formInput}
      changed={inputChangeHandler}
      onNavClick={onNavClick}
    />
  );
  return (
    form
  );
};

Auth.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSignUp: PropTypes.func.isRequired,
  serverError: PropTypes.oneOf([null, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  serverError: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
  authType: state.auth.authType,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (username, email, password) => dispatch(signUp(username, email, password)),
  onLogIn: (email, password) => dispatch(logIn(email, password)),
  onNavClick: (nav, path) => dispatch(authNav(nav, path))
});

export default connect(mapStateToProps,
  mapDispatchToProps)(Auth);
