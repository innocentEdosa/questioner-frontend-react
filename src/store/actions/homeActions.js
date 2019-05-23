import * as actions from './actionTypes';
import { fetchRandomMeetups, fetchTrendingMeetups } from '../api/index';

export const getRandomMeetupsStart = () => ({
  type: actions.FETCH_RANDOM_MEETUPS_START
});

export const getRandomMeetupsSucceeded = randomMeetups => ({
  type: actions.FETCH_RANDOM_MEETUPS_SUCCEEDED,
  randomMeetups,
});

export const getTrendingMeetupsStart = () => ({
  type: actions.FETCH_TRENDING_MEETUPS_START
});

export const getTrendingMeetupsSucceeded = trendingMeetups => ({
  type: actions.FETCH_TRENDING_MEETUPS_SUCCEEDED,
  trendingMeetups,
});
export const getRandomMeetups = (number = 4) => async (dispatch) => {
  dispatch(getRandomMeetupsStart());
  try {
    const response = await fetchRandomMeetups(number);
    const randomMeetups = response.data.data;
    dispatch(getRandomMeetupsSucceeded(randomMeetups));
  } catch (error) {
    // console.log(error.response.data);
  }
};

export const getTrendingMeetups = () => async (dispatch) => {
  dispatch(getTrendingMeetupsStart());
  try {
    const response = await fetchTrendingMeetups();
    if (response) {
      const trendingMeetups = response.data.data;
      dispatch(getTrendingMeetupsSucceeded(trendingMeetups));
    }
  } catch (error) {
    // console.log(error);
  }
};
