import * as actions from '../actions/actionTypes';

const initialState = {
  gettingMeetups: false,
  specificMeetup: {},
  meetups: [],
  error: null,
  loadingSpecificMeetup: false,
  loadSpecificMeetupFailed: false,
};

const getAllMeetupsStart = state => ({
  ...state,
  gettingMeetups: true,
  error: null
});

const getAllMeetupsSucceeded = (state, action) => {
  const newState = { ...state };
  newState.meetups = [...state.meetups, ...action.meetups];
  return {
    ...newState,
    gettingMeetups: false,
  };
};

const getAllMeetupsFailed = (state, action) => ({
  ...state,
  error: action.error,
  gettingMeetups: false
});

const getSpecificMeetupStart = state => ({
  ...state,
  loadingSpecificMeetup: true
});

const getSpecificMeetupSucceeded = (state, action) => ({
  ...state,
  loadingSpecificMeetup: false,
  specificMeetup: action.meetup
});

const getSpecificMeetupFailed = state => ({
  ...state,
  loadingSpecificMeetup: false,
  loadingSpecificMeetupFailed: true
});

const AllMeetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MEETUPS_START: return getAllMeetupsStart(state);
    case actions.FETCH_MEETUPS_SUCCEEDED: return getAllMeetupsSucceeded(state, action);
    case actions.FETCH_MEETUPS_FAILED: return getAllMeetupsFailed(state, action);
    case actions.FETCH_SPECIFIC_MEETUP_START: return getSpecificMeetupStart(state);
    case actions.FETCH_SPECIFIC_MEETUP_SUCCEEDED: return getSpecificMeetupSucceeded(state, action);
    case actions.FETCH_SPECIFIC_MEETUP_FAILED: return getSpecificMeetupFailed(state, action);
    default:
      return state;
  }
};

export default AllMeetupsReducer;
