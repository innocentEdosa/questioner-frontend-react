import React from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from './actionTypes';


export const openModal = () => ({
  type: actions.OPEN_MEETUP_MODAL,
  shouldModalOpen: true,
});

export const openMeetupModal = () => (dispatch) => {
  dispatch(openModal());
  return <Redirect to="/Admin" />;
};

export const closeMeetupModal = () => ({
  type: actions.CLOSE_MEETUP_MODAL,
  shouldModalOpen: false
});
