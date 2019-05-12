import axios from 'axios';

const API_BASE_URL = 'https://innocentsquestioner.herokuapp.com/api/v1/';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = params => client.post('/auth/signup', params);
export const login = params => client.post('/auth/login', params);
