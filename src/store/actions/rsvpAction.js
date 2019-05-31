import * as actions from './actionTypes';
import { fetchRsvp, createRsvp } from '../api/index';

export const getMeetupRsvpStart = () => ({
  type: actions.FETCH_MEETUP_RSVP_START
});

export const getMeetupRsvpSucceeded = rsvpResponse => ({
  type: actions.FETCH_MEETUP_RSVP_SUCCEEDED,
  rsvpResponse
});

export const getMeetupRsvpFailed = () => ({
  type: actions.FETCH_MEETUP_RSVP_FAILED
});

export const getMeetupRsvp = (userId, meetupId) => async (dispatch) => {
  dispatch(getMeetupRsvpStart());
  try {
    const response = await fetchRsvp(userId, meetupId);
    if (response) {
      const rsvpResponse = response.data.data.response;
      dispatch(getMeetupRsvpSucceeded(rsvpResponse));
    }
  } catch (error) {
    dispatch(getMeetupRsvpFailed());
  }
};

export const createRsvpStart = () => ({
  type: actions.CREATE_RSVP_START
});

export const createRsvpSuccessful = (rsvp, updateMsg) => ({
  type: actions.CREATE_RSVP_SUCCESSFUL,
  rsvp,
  updateMsg
});

export const createRsvpFailed = () => ({
  type: actions.CREATE_RSVP_FAILED
});

export const createMeetupRsvp = (meetupId,
  userId,
  response) => async (dispatch) => {
  dispatch(createRsvpStart());
  const data = {
    meetup: Number(meetupId),
    user: userId,
    response: String(response)
  };
  try {
    const rsvpResponse = await createRsvp(meetupId, data);
    const rsvp = rsvpResponse.data.data[0].response;
    const updateMsg = rsvpResponse.data.msg;
    dispatch(createRsvpSuccessful(rsvp, updateMsg));
  } catch (error) {
    dispatch(createRsvpFailed());
  }
};
