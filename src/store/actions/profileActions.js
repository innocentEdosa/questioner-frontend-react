import * as actions from './actionTypes';
import { fetchUserRsvp } from '../api/index';

export const getUserRsvpStart = () => ({
  type: actions.FETCH_USER_RSVP_START
});

export const getUserRsvpSucceeded = userRsvp => ({
  type: actions.FETCH_USER_RSVP_SUCCEEDED,
  userRsvp
});

export const getUserRsvpFailed = () => ({
  type: actions.FETCH_USER_RSVP_FAILED
});

export const getUserRsvp = userId => async (dispatch) => {
  dispatch(getUserRsvpStart());
  try {
    const response = await fetchUserRsvp(userId);
    const userRsvp = response.data.data;
    dispatch(getUserRsvpSucceeded(userRsvp));
  } catch (error) {
    dispatch(getUserRsvpFailed());
  }
};
