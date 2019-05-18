import * as actions from '../actions/actionTypes';

const initialState = {
  isCreateMeetupModal: false,
  creatingMeetup: false,
  meetups: [],
  error: null
};

const meetupModalHandler = (state, action) => ({
  ...state,
  isCreateMeetupModal: action.shouldModalOpen,
});

const createMeetupStart = state => ({
  ...state,
  creatingMeetup: true,
  error: null
});

const createMeetupSucceeded = (state, action) => {
  const newState = { ...state };
  newState.meetups = [...state.meetups, ...action.meetup];
  return {
    ...newState,
    creatingMeetup: false
  };
};

const createMeetupFailed = (state, action) => ({
  ...state,
  error: action.error,
  creatingMeetup: false,
});

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_MEETUP_START: return createMeetupStart(state);
    case actions.CREATE_MEETUP_SUCCEEDED: return createMeetupSucceeded(state, action);
    case actions.CREATE_MEETUP_FAILED: return createMeetupFailed(state, action);
    case actions.OPEN_MEETUP_MODAL: return meetupModalHandler(state, action);
    case actions.CLOSE_MEETUP_MODAL: return meetupModalHandler(state, action);
    default:
      return state;
  }
};

export default adminReducer;
