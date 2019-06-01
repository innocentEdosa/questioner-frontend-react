import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../src/store/actions/profileActions';
import * as types from '../src/store/actions/actionTypes';
import ProfileReducer from '../src/store/reducers/profileReducer';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);

describe('profile actions', () => {
  it('should start fetching user rsvp', () => {
    const expectedAction = {
      type: types.FETCH_USER_RSVP_START
    };
    expect(actions.getUserRsvpStart()).toEqual(expectedAction);
  });

  it('getting user rsvp succeeded', () => {
    const expectedAction = {
      type: types.FETCH_USER_RSVP_SUCCEEDED,
      userRsvp: 'some-rsvp'
    };
    expect(actions.getUserRsvpSucceeded('some-rsvp')).toEqual(expectedAction);
  });


  it('getting user rsvp failed', () => {
    const expectedAction = {
      type: types.FETCH_USER_RSVP_FAILED
    };
    expect(actions.getUserRsvpFailed()).toEqual(expectedAction);
  });

  it('fetch user rsvp succeeded', () => {
    mock.onGet('/rsvp/1').reply(200, {
      data: {
        data: []
      }
    });
    const expectedActions = [
      'FETCH_USER_RSVP_START',
      'FETCH_USER_RSVP_SUCCEEDED'
    ];
    const store = mockStore({});
    store.dispatch(actions.getUserRsvp(1))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('fetch user rsvp failed', () => {
    mock.onGet('/rsvp/1').reply(500);
    const expectedActions = [
      'FETCH_USER_RSVP_START',
      'FETCH_USER_RSVP_FAILED'
    ];
    const store = mockStore({});
    store.dispatch(actions.getUserRsvp(1))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe('profile reducer', () => {
  const initialState = {
    gettingUserRsvp: false,
    userRsvp: [],
  };

  it('should return the initialState', () => {
    expect(ProfileReducer(initialState, {})).toEqual({
      ...initialState
    });
  });

  it('get user rsvp start', () => {
    expect(ProfileReducer(initialState, actions.getUserRsvpStart())).toEqual({
      ...initialState,
      gettingUserRsvp: true
    });
  });

  it('get user rsvp succeeded', () => {
    expect(ProfileReducer(initialState, actions.getUserRsvpSucceeded())).toEqual({
      ...initialState,
      gettingUserRsvp: false,
      userRsvp: actions.userRsvp
    });
  });

  it('get user rsvp failed', () => {
    expect(ProfileReducer(initialState, actions.getUserRsvpFailed())).toEqual({
      ...initialState,
      gettingUserRsvp: false,
      userRsvp: []
    });
  });
});
