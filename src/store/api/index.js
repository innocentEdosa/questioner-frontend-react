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
export const fetchRandomMeetups = number => getAxiosInstance().get(`/meetups/random/${number}`);
export const fetchTrendingMeetups = () => getAxiosInstance().get('/meetups/trending');
export const fetchSpecificMeetup = meetId => getAxiosInstance().get(`/meetups/${meetId}`);
export const postQuestion = params => getAxiosInstance().post('/questions', params);
export const fetchQuestions = meetupId => getAxiosInstance().get(`/questions/meetups/${meetupId}`);
