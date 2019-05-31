import * as actions from '../actions/actionTypes';

const initialState = {
  gettingRsvp: false,
  rsvpResponse: null,
};

const getMeetupRsvpStart = state => ({
  ...state,
  gettingRsvp: true,
  rsvpResponse: null,
});

const getMeetupRsvpSucceeded = (state, action) => ({
  ...state,
  gettingRsvp: false,
  rsvpResponse: action.rsvpResponse
});

const getMeetupRsvpFailed = state => ({
  ...state,
  gettingRsvp: false,
  rsvpResponse: null
});

const createRsvpStart = state => ({
  ...state,
  gettingRsvp: true
});

const createRsvpSuccessful = (state, action) => ({
  ...state,
  rsvpResponse: action.rsvp,
  gettingRsvp: false
});

const createRsvpFailed = state => ({
  ...state,
  gettingRsvp: false
});

const rsvpReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_MEETUP_RSVP_START: return getMeetupRsvpStart(state);
    case actions.FETCH_MEETUP_RSVP_SUCCEEDED: return getMeetupRsvpSucceeded(state, action);
    case actions.FETCH_MEETUP_RSVP_FAILED: return getMeetupRsvpFailed(state, action);
    case actions.CREATE_RSVP_START: return createRsvpStart(state);
    case actions.CREATE_RSVP_SUCCESSFUL: return createRsvpSuccessful(state, action);
    case actions.CREATE_RSVP_FAILED: return createRsvpFailed(state);
    default:
      return initialState;
  }
};

export default rsvpReducer;
