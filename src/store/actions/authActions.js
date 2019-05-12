import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as actions from './actionTypes';
import { signup, login } from '../api/index';

export const authStart = () => ({ type: actions.LOADING });

export const authSuccessful = (token, user) => ({
  type: actions.AUTH_SUCCESSFUL,
  token,
  user
});

export const authFailed = error => ({
  type: actions.AUTH_FAILED,
  error
});

export const authType = authform => ({
  type: actions.AUTH_NAV,
  authType: authform
});

export const signUp = (username, email, password) => async (dispatch) => {
  dispatch(authStart());
  const authData = {
    username,
    email,
    password,
    firstname: 'yourfirstname',
    lastname: 'yourlastname',
    othername: 'johndoe',
    phoneNumber: 7000000000
  };
  try {
    const response = await signup(authData);
    if (response) {
      const { token, user } = response.data.data[0];
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      dispatch(authSuccessful(token, user));
      toast.success('Your sign up was successful');
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(authFailed(error));
  }
};

export const logIn = (email, password) => async (dispatch) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
  };
  try {
    const response = await login(authData);
    if (response) {
      const { token, user } = response.data.data[0];
      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      dispatch(authSuccessful(token, user));
      toast.success('Your log in was successful');
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(authFailed(error));
  }
};

export const authNav = authform => async (dispatch) => {
  dispatch(authType(authform));
  return <Redirect to="/Auth" />;
};
