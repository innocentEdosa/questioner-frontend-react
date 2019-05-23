import * as actions from '../actions/actionTypes';

const initialState = {
  loadingTrendingMeetups: false,
  trendingMeetups: [],
  loadingRandomMeetups: false,
  randomMeetups: [],
  error: null
};

const getRandomMeetupsStart = state => ({
  ...state,
  loadingRandomMeetups: true,
  error: null
});

const getTrendingMeetupsStart = state => ({
  ...state,
  loadingTrendingMeetups: true,
  error: null
});

const getTrendingMeetupsSucceeded = (state, action) => {
  const newState = { ...state };
  newState.trendingMeetups = [
    ...state.trendingMeetups,
    ...action.trendingMeetups
  ];
  return {
    ...newState,
    loadingTrendingMeetups: false
  };
};

const getRandomMeetupsSucceeded = (state, action) => {
  const newState = { ...state };
  newState.randomMeetups = [...action.randomMeetups];
  return {
    ...newState,
    loadingRandomMeetups: false
  };
};

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_RANDOM_MEETUPS_START:
      return getRandomMeetupsStart(state);
    case actions.FETCH_RANDOM_MEETUPS_SUCCEEDED:
      return getRandomMeetupsSucceeded(state, action);
    case actions.FETCH_TRENDING_MEETUPS_START:
      return getTrendingMeetupsStart(state);
    case actions.FETCH_TRENDING_MEETUPS_SUCCEEDED:
      return getTrendingMeetupsSucceeded(state, action);
    default:
      return state;
  }
};

export default indexReducer;
