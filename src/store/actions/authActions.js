import * as actions from './actionTypes';
import signup from '../api/index';

export const authStart = () => ({ type: actions.LOADING });

export const authSuccessfull = (token, user) => ({
  type: actions.AUTH_SUCCESSFUL,
  token,
  user
});

export const authFailed = error => ({
  type: actions.AUTH_FAILED,
  error
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
      dispatch(authSuccessfull(token, user));
    }
  } catch (err) {
    const { error } = err.response.data;
    dispatch(authFailed(error));
  }
};
