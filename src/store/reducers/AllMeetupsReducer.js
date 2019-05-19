import * as actions from '../actions/actionTypes';

const initialState = {
  gettingMeetups: false,
  meetups: [],
  error: null
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

const AllMeetupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MEETUPS_START: return getAllMeetupsStart(state);
    case actions.FETCH_MEETUPS_SUCCEEDED: return getAllMeetupsSucceeded(state, action);
    case actions.FETCH_MEETUPS_FAILED: return getAllMeetupsFailed(state, action);
    default:
      return state;
  }
};

export default AllMeetupsReducer;
