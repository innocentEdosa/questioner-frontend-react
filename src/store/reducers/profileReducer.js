import * as actions from '../actions/actionTypes';

const initialState = {
  gettingUserRsvp: false,
  userRsvp: [],
};

const getUserRsvpStart = state => ({
  ...state,
  gettingUserRsvp: true
});

const getUserRsvpSucceeded = (state, action) => ({
  ...state,
  gettingUserRsvp: false,
  userRsvp: action.userRsvp
});

const getUserRsvpFailed = state => ({
  ...state,
  gettingUserRsvp: false,
  userRsvp: []
});

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_USER_RSVP_START: return getUserRsvpStart(state);
    case actions.FETCH_USER_RSVP_SUCCEEDED: return getUserRsvpSucceeded(state, action);
    case actions.FETCH_USER_RSVP_FAILED: return getUserRsvpFailed(state);

    default:
      return initialState;
  }
};

export default ProfileReducer;
