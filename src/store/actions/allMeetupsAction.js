import { toast } from 'react-toastify';
import * as actions from './actionTypes';
import { getMeetups } from '../api/index';

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
    toast.failed('Something went wrong! Cant get all meetups now');
  }
};
