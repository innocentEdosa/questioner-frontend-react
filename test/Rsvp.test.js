import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../src/store/actions/rsvpAction';
import * as types from '../src/store/actions/actionTypes';
import rsvpReducer from '../src/store/reducers/rsvpReducer';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);

describe('rsvp actions', () => {
  it('getMeetupRsvpStart', () => {
    const expectedAction = {
      type: types.FETCH_MEETUP_RSVP_START
    };
    expect(actions.getMeetupRsvpStart()).toEqual(expectedAction);
  });

  it('getMeetupRsvpSucceeded', () => {
    const expectedAction = {
      type: types.FETCH_MEETUP_RSVP_SUCCEEDED,
      rsvpResponse: 'some-response'
    };
    expect(actions.getMeetupRsvpSucceeded('some-response')).toEqual(expectedAction);
  });

  it('getMeetupRsvpFailed', () => {
    const expectedAction = {
      type: types.FETCH_MEETUP_RSVP_FAILED
    };
    expect(actions.getMeetupRsvpFailed()).toEqual(expectedAction);
  });

  it('getMeetupRsvp', () => {
    mock.onGet('/rsvp/2/3').reply(200, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'FETCH_MEETUP_RSVP_START',
      'FETCH_MEETUP_RSVP_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getMeetupRsvp(2, 3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('getMeetupRsvp failed', () => {
    mock.onGet('/rsvp/2/3').reply(500);

    const expectedActions = [
      'FETCH_MEETUP_RSVP_START',
      'FETCH_MEETUP_RSVP_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getMeetupRsvp(2, 3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('createRsvpStart', () => {
    const expectedAction = {
      type: types.CREATE_RSVP_START
    };
    expect(actions.createRsvpStart()).toEqual(expectedAction);
  });

  it('createRsvpSucceeded', () => {
    const expectedAction = {
      type: types.CREATE_RSVP_SUCCESSFUL,
      rsvp: 'some-rsvp',
      updateMsg: 'some-update'
    };
    expect(actions.createRsvpSuccessful('some-rsvp', 'some-update')).toEqual(expectedAction);
  });

  it('createRsvpFailed', () => {
    const expectedAction = {
      type: types.CREATE_RSVP_FAILED
    };
    expect(actions.createRsvpFailed()).toEqual(expectedAction);
  });

  it('createMeetupRsvp succeeded', () => {
    mock.onGet('/meetups/3/rsvp').reply(200, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'CREATE_RSVP_START',
      'CREATE_RSVP_SUCCESSFUL'
    ];
    const store = mockStore({});
    store.dispatch(actions.createMeetupRsvp(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('createMeetupRsvp failed', () => {
    mock.onGet('/meetups/3/rsvp').reply(500);

    const expectedActions = [
      'CREATE_RSVP_START',
      'CREATE_RSVP_FAILED'
    ];
    const store = mockStore({});
    store.dispatch(actions.createMeetupRsvp(3))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe('rsvp reducers', () => {
  const initialState = {
    gettingRsvp: false,
    rsvpResponse: null,
  };

  it('should return the initial state', () => {
    expect(rsvpReducer(initialState, {})).toEqual({
      ...initialState
    });
  });

  it('getMeetupRsvpStart', () => {
    expect(rsvpReducer(initialState, actions.getMeetupRsvpStart())).toEqual({
      ...initialState,
      gettingRsvp: true,
      rsvpResponse: null,
    });
  });

  it('getMeetupRsvpSucceeded', () => {
    expect(rsvpReducer(initialState, actions.getMeetupRsvpSucceeded())).toEqual({
      ...initialState,
      gettingRsvp: false,
      rsvpResponse: actions.rsvpResponse
    });
  });

  it('getMeetupRsvpFailed', () => {
    expect(rsvpReducer(initialState, actions.getMeetupRsvpFailed())).toEqual({
      ...initialState,
      gettingRsvp: false,
      rsvpResponse: null
    });
  });

  it('createRsvpStart', () => {
    expect(rsvpReducer(initialState, actions.createRsvpStart())).toEqual({
      ...initialState,
      gettingRsvp: true
    });
  });


  it('createRsvpSuccessful', () => {
    expect(rsvpReducer(initialState, actions.createRsvpSuccessful())).toEqual({
      ...initialState,
      rsvpResponse: actions.rsvp,
      gettingRsvp: false
    });
  });

  it('createRsvpFailed', () => {
    expect(rsvpReducer(initialState, actions.createRsvpFailed())).toEqual({
      ...initialState,
      gettingRsvp: false
    });
  });
});
