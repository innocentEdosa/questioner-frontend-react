import { toast } from 'react-toastify';
import * as actions from './actionTypes';
import { getMeetups, fetchSpecificMeetup } from '../api/index';

export const getAllMeetupsStart = () => ({
  type: actions.FETCH_MEETUPS_START
});

export const getAllMeetupsSucceeded = meetups => ({
  type: actions.FETCH_MEETUPS_SUCCEEDED,
  meetups,
});

export const getAllMeetupsFailed = error => ({
  type: actions.FETCH_MEETUPS_FAILED,
  error
});

export const getSpecificMeetupStart = () => ({
  type: actions.FETCH_SPECIFIC_MEETUP_START
});

export const getSpecificMeetupSucceeded = meetup => ({
  type: actions.FETCH_SPECIFIC_MEETUP_SUCCEEDED,
  meetup
});

export const getSpecificMeetupFailed = () => ({
  type: actions.FETCH_SPECIFIC_MEETUP_FAILED
});
export const getAllMeetups = () => async (dispatch) => {
  dispatch(getAllMeetupsStart());
  try {
    const response = await getMeetups();
    if (response) {
      const meetups = response.data.data;
      dispatch(getAllMeetupsSucceeded(meetups));
    }
  } catch (err) {
    const error = err.response.data;
    dispatch(getAllMeetupsFailed(error));
    toast.success('Something went wrong! Cant get all meetups now');
  }
};

export const getSpecificMeetup = id => async (dispatch) => {
  dispatch(getSpecificMeetupStart());
  return fetchSpecificMeetup(id)
    .then((response) => {
      const meetup = response.data.data[0];
      dispatch(getSpecificMeetupSucceeded(meetup));
    })
    .catch((error) => {
      dispatch(getSpecificMeetupFailed());
    });
};
