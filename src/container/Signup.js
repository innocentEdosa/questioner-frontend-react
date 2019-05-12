/* eslint-disable semi */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpForm from '../components/SignUpForm';
import authFormValidator from '../helper/authFormValidator';
import { signUp } from '../store/actions/authActions';

const Signup = ({
  loading,
  onSignUp,
  serverError,
  history,
  isAuthenticated
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
      onSignUp(username, email, password);
    }
  };

  if (isAuthenticated) {
    history.push('/');
  }

  return (
    <SignUpForm
      serverError={serverError}
      loading={loading}
      blur={onBlurHandler}
      submit={submitHandler}
      changed={inputChangeHandler}
      values={formInput}
    />
  );
};

Signup.propTypes = {
  loading: PropTypes.bool.isRequired,
  onSignUp: PropTypes.func.isRequired,
  serverError: PropTypes.oneOf([null, PropTypes.object]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  serverError: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (username, email, password) => dispatch(signUp(username, email, password))
});

export default connect(mapStateToProps,
  mapDispatchToProps)(Signup);
