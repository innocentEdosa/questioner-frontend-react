import axios from 'axios';
import { toast } from 'react-toastify';
import { decode } from 'jsonwebtoken';
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

export const authType = (authform, path) => ({
  type: actions.AUTH_NAV,
  authType: authform,
  path
});

// ANCHOR Remove this later
export const adminAuth = () => (dispatch) => {
  toast.success('You need to be login in as an admin to access admin routes');
};

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
      const decodedToken = decode(token);
      user.id = decodedToken.userId;
      user.isAdmin = decodedToken.isAdmin;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      dispatch(authSuccessful(token, user));
      toast.success('Your sign up was successful');
    }
  } catch (err) {
    if (err.response) {
      const { error } = err.response.data;
      dispatch(authFailed(error));
    }
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
      const decodedToken = decode(token);
      user.id = decodedToken.userId;
      user.isAdmin = decodedToken.isAdmin;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      dispatch(authSuccessful(token, user));
      toast.success('Your log in was successful');
    }
  } catch (err) {
    if (err.response) {
      const { error } = err.response.data;
      dispatch(authFailed(error));
    }
  }
};
export const logOut = () => ({
  type: actions.LOG_USER_OUT
});

export const logOutUser = () => (dispatch) => {
  localStorage.clear();
  dispatch(logOut());
};
export const authNav = (authform, path) => async (dispatch) => {
  dispatch(authType(authform, path));
};

export const verifyUserSucceeded = (token, user) => ({
  type: actions.VERIFY_USER_SUCCEEDED,
  token,
  user
});

export const verifyUserStart = () => ({
  type: actions.VERIFY_USER_START
});

export const verifyUserFailed = () => ({
  type: actions.VERIFY_USER_FAILED
});
export const verifyUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (token && user) {
    dispatch(verifyUserStart());
    try {
      const response = await axios.post('https://innocentsquestioner.herokuapp.com/api/v1/auth/verify', {}, {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-type': 'application/json',
          Authorization: token,
        }
      });
      if (response.data.status) {
        return dispatch(verifyUserSucceeded(token, user));
      }
    } catch (error) {
      return dispatch(verifyUserFailed());
    }
  }
};
