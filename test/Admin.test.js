import React from 'react';
import { Redirect } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../src/store/actions/adminActions';
import * as types from '../src/store/actions/actionTypes';
import adminReducer from '../src/store/reducers/adminReducer';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);

describe('admin actions', () => {
  it('should open modal - action', () => {
    const expectedAction = {
      type: types.OPEN_MEETUP_MODAL,
      shouldModalOpen: true
    };
    expect(actions.openModal()).toEqual(expectedAction);
  });

  it('should dispatch open modal - action', async () => {
    const expectedAction = [
      'OPEN_MEETUP_MODAL'
    ];
    const store = mockStore({});
    const response = await store.dispatch(actions.openMeetupModal());
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedAction);
    expect(response).toEqual(<Redirect to="/Admin" />);
  });

  it('should close modal - action', () => {
    const expectedAction = {
      type: types.CLOSE_MEETUP_MODAL,
      shouldModalOpen: false
    };
    expect(actions.closeMeetupModal()).toEqual(expectedAction);
  });

  it('create meetup start - action', () => {
    const expectedAction = {
      type: types.CREATE_MEETUP_START,
    };
    expect(actions.createMeetupStart()).toEqual(expectedAction);
  });

  it('create meetup succeeded - action', () => {
    const expectedAction = {
      type: types.CREATE_MEETUP_SUCCEEDED,
      meetup: 'some-meetup'
    };
    expect(actions.createMeetupSucceeded('some-meetup')).toEqual(expectedAction);
  });

  it('create meetup failed - action', () => {
    const expectedAction = {
      type: types.CREATE_MEETUP_FAILED,
      error: 'some-error'
    };
    expect(actions.createMeetupFailed('some-error')).toEqual(expectedAction);
  });

  it('should create a meetup', () => {
    mock.onPost('/meetups').reply(201, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'CREATE_MEETUP_START',
      'CREATE_MEETUP_SUCCEEDED',
      'CLOSE_MEETUP_MODAL'
    ];

    const store = mockStore({});
    const date = new Date();
    store.dispatch(actions.createMeetup('sometitle of a meetup', date, 'this is the location of the meetup', 'this is the discripton of the very long meetup', ['someImageUrl']))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should fail to create a meetup', () => {
    mock.onPost('/meetups').reply(500);

    const expectedActions = [
      'CREATE_MEETUP_START',
      'CREATE_MEETUP_FAILED',
    ];

    const store = mockStore({});
    const date = new Date();
    store.dispatch(actions.createMeetup('sometitle of a meetup', date, 'this is the location of the meetup', 'this is the discripton of the very long meetup', ['someImageUrl']))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('get admin meetup start - action', () => {
    const expectedAction = {
      type: types.FETCH_ADMIN_MEETUPS_START,
    };
    expect(actions.getAdminMeetupsStart()).toEqual(expectedAction);
  });

  it('get admin meetup succeeded - action', () => {
    const expectedAction = {
      type: types.FETCH_ADMIN_MEETUPS_SUCCEEDED,
      adminMeetups: 'some-meetups'
    };
    expect(actions.getAdminMeetupsSucceeded('some-meetups')).toEqual(expectedAction);
  });

  it('get admin meetup succeeded - action', () => {
    const expectedAction = {
      type: types.FETCH_ADMIN_MEETUPS_SUCCEEDED,
      adminMeetups: 'some-meetups'
    };
    expect(actions.getAdminMeetupsSucceeded('some-meetups')).toEqual(expectedAction);
  });

  it('get admin meetup failed - action', () => {
    const expectedAction = {
      type: types.FETCH_ADMIN_MEETUPS_FAILED,
      error: 'some-error'
    };
    expect(actions.getAdminMeetupsFailed('some-error')).toEqual(expectedAction);
  });

  it('should fail to get admin meetups', () => {
    mock.onGet('/meetups/3/meetups').reply(500);

    const expectedActions = [
      'FETCH_ADMIN_MEETUPS_START',
      'FETCH_ADMIN_MEETUPS_FAILED',
    ];

    const store = mockStore({});
    store.dispatch(actions.getAdminMeetups(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should get admin meetups', () => {
    mock.onPost('/meetups/3/meetups').reply(201, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'FETCH_ADMIN_MEETUPS_START',
      'FETCH_ADMIN_MEETUPS_SUCCEEDED',
    ];

    const store = mockStore({});
    store.dispatch(actions.getAdminMeetups(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe('admin reducer', () => {
  const initialState = {
    isCreateMeetupModal: false,
    creatingMeetup: false,
    gettingMeetups: false,
    meetups: [],
    error: null
  };
  it('should return the initial state', () => {
    expect(adminReducer(initialState, {})).toEqual({
      ...initialState
    });
  });

  it('should open create meetup modal', () => {
    expect(adminReducer(initialState, actions.openModal())).toEqual({
      ...initialState,
      isCreateMeetupModal: true
    });
  });

  it('should close create meetup modal', () => {
    expect(adminReducer(initialState, actions.closeMeetupModal())).toEqual({
      ...initialState,
      isCreateMeetupModal: false
    });
  });

  it('create meetup start', () => {
    expect(adminReducer(initialState, actions.createMeetupStart())).toEqual({
      ...initialState,
      creatingMeetup: true,
      error: null
    });
  });

  it('create meetup succeeded', () => {
    expect(adminReducer(initialState, actions.createMeetupSucceeded([{}]))).toEqual({
      ...initialState,
      creatingMeetup: false,
      meetups: [{}]
    });
  });

  it('create meetup failed', () => {
    expect(adminReducer(initialState, actions.createMeetupFailed({}))).toEqual({
      ...initialState,
      error: {},
      creatingMeetup: false,
    });
  });

  it('get admin meetup start', () => {
    expect(adminReducer(initialState, actions.getAdminMeetupsStart({}))).toEqual({
      ...initialState,
      gettingMeetups: true,
      error: null,
    });
  });


  it('get admin meetup succeeded', () => {
    expect(adminReducer(initialState, actions.getAdminMeetupsSucceeded([{}]))).toEqual({
      ...initialState,
      gettingMeetups: false,
      error: null,
      meetups: [{}]
    });
  });

  it('get admin meetup succeeded', () => {
    expect(adminReducer(initialState, actions.getAdminMeetupsFailed({}))).toEqual({
      ...initialState,
      gettingMeetups: false,
      error: {},
    });
  });
});
