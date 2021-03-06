import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as actions from './actionTypes';
import { postMeetup, fetchAdminMeetups, deleteMeetup } from '../api/index';

export const openModal = () => ({
  type: actions.OPEN_MEETUP_MODAL,
  shouldModalOpen: true
});

export const openMeetupModal = () => (dispatch) => {
  dispatch(openModal());
  return <Redirect to="/Admin" />;
};

export const closeMeetupModal = () => ({
  type: actions.CLOSE_MEETUP_MODAL,
  shouldModalOpen: false
});

export const createMeetupStart = () => ({ type: actions.CREATE_MEETUP_START });

export const createMeetupSucceeded = meetup => ({
  type: actions.CREATE_MEETUP_SUCCEEDED,
  meetup,
});

export const createMeetupFailed = error => ({
  type: actions.CREATE_MEETUP_FAILED,
  error
});
export const createMeetup = formInput => async (dispatch) => {
  dispatch(createMeetupStart());
  const {
    title, date, location, description, file
  } = formInput;
  const image = file[0];
  const formData = new FormData();
  formData.append('topic', title);
  formData.append('happeningOn', date);
  formData.append('images', image);
  formData.append('location', location);
  formData.append('description', description);
  try {
    const response = await postMeetup(formData);
    if (response) {
      const meetup = response.data.data;
      dispatch(createMeetupSucceeded(meetup));
      dispatch(closeMeetupModal());
      toast.success('Your meetup was created successfully');
    }
  } catch (err) {
    const error = err.response.data;
    dispatch(createMeetupFailed(error));
  }
};

// getting meetups made by an admin

export const getAdminMeetupsStart = () => ({
  type: actions.FETCH_ADMIN_MEETUPS_START
});

export const getAdminMeetupsSucceeded = adminMeetups => ({
  type: actions.FETCH_ADMIN_MEETUPS_SUCCEEDED,
  adminMeetups
});

export const getAdminMeetupsFailed = error => ({
  type: actions.FETCH_ADMIN_MEETUPS_FAILED,
  error
});

export const getAdminMeetups = adminId => async (dispatch) => {
  dispatch(getAdminMeetupsStart());
  try {
    const response = await fetchAdminMeetups(adminId);
    if (response) {
      const adminMeetups = response.data.data;
      dispatch(getAdminMeetupsSucceeded(adminMeetups));
    }
  } catch (err) {
    const error = err.response.data;
    dispatch(getAdminMeetupsFailed(error));
  }
};

// delete meetup

export const openDeleteModal = meetup => ({
  type: actions.OPEN_DELETE_MODAL,
  meetup
});

export const cancelDeleteMeetup = () => ({
  type: actions.CANCEL_MEETUP_DELETE
});

export const deleteMeetupStart = () => ({
  type: actions.DELETE_MEETUP_START
});

export const deleteMeetupSuccessful = meetup => ({
  type: actions.DELETE_MEETUP_SUCCESSFUL,
  meetup
});

export const deleteMeetupFailed = () => ({
  type: actions.DELETE_MEETUP_FAILED
});

export const deleteSpecificMeetup = meetup => async (dispatch) => {
  dispatch(deleteMeetupStart());
  try {
    const response = await deleteMeetup(meetup);
    if (response) {
      dispatch(deleteMeetupSuccessful(meetup));
      toast.success('Your meetup was deleted successfully');
    }
  } catch (error) {
    dispatch(deleteMeetupFailed());
    toast.error('Your meetup could not be deleted. !!!try again later');
  }
};
