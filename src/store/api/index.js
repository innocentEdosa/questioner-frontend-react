import axios from 'axios';
import store from '../index';

const API_BASE_URL = 'https://innocentsquestioner.herokuapp.com/api/v1/';
export const getAxiosInstance = () => {
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
export const fetchAdminMeetups = adminId => getAxiosInstance().get(`/meetups/${adminId}/meetups`);
export const upVote = questionId => getAxiosInstance().patch(`/questions/${questionId}/upvote`);
export const downVote = questionId => getAxiosInstance().patch(`/questions/${questionId}/downvote`);
export const fetchRsvp = (userId, meetupId) => getAxiosInstance().get(`/rsvp/${userId}/${meetupId}`);
export const createRsvp = (meetupId, params) => getAxiosInstance().post(`/meetups/${meetupId}/rsvp`, params);
export const fetchUserRsvp = userId => getAxiosInstance().get(`/rsvp/${userId}`);
export const fetchComment = questionId => getAxiosInstance().get(`/comments/questions/${questionId}`);
