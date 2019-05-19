import axios from 'axios';
import store from '../index';

const API_BASE_URL = 'https://innocentsquestioner.herokuapp.com/api/v1/';
const getAxiosInstance = () => {
  const state = store.getState();
  const { token } = state.auth;
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
  });
};

export const signup = params => getAxiosInstance().post('/auth/signup', params);
export const login = params => getAxiosInstance().post('/auth/login', params);
export const postMeetup = params => getAxiosInstance().post('/meetups', params);
export const getMeetups = () => getAxiosInstance().get('/meetups');
