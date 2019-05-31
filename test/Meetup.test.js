import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
// import { shallow } from 'enzyme';
import ScheduleCard from '../src/components/ScheduleCard';
import MeetupJumbotron from '../src/components/MeetupJumbotron';
import * as actions from '../src/store/actions/meetupsAction';
import * as types from '../src/store/actions/actionTypes';
import AllMeetupReducer from '../src/store/reducers/meetupsReducer';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);
describe('<ScheduleCard />', () => {
  it('Should match the snapshot', () => {
    const tree = renderer.create(<ScheduleCard style={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('<MeetupJumbotron />', () => {
  it('Should match the snapshot', () => {
    const tree = renderer.create(<MeetupJumbotron meetup={{}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('Meetup actions', () => {
  it('should create an action of type FETCH_MEETUPS_START', () => {
    const expectedAction = {
      type: types.FETCH_MEETUPS_START
    };
    expect(actions.getAllMeetupsStart()).toEqual(expectedAction);
  });

  it('should create an action of type FETCH_MEETUPS_SUCCEEDED', () => {
    const meetups = [{}, {}];
    const expectedAction = {
      type: types.FETCH_MEETUPS_SUCCEEDED,
      meetups
    };
    expect(actions.getAllMeetupsSucceeded(meetups)).toEqual(expectedAction);
  });

  it('it should create an action of type FETCH_MEETUPS_FAILED', () => {
    const error = {};
    const expectedAction = {
      type: types.FETCH_MEETUPS_FAILED,
      error
    };
    expect(actions.getAllMeetupsFailed(error)).toEqual(expectedAction);
  });

  it('it should create an action of type FETCH_SPECIFIC_MEETUP_START', () => {
    const expectedAction = {
      type: types.FETCH_SPECIFIC_MEETUP_START
    };
    expect(actions.getSpecificMeetupStart()).toEqual(expectedAction);
  });

  it('it should create an action of type FETCH_SPECIFIC_MEETUP_SUCCEEDED', () => {
    const meetup = { };
    const expectedAction = {
      type: types.FETCH_SPECIFIC_MEETUP_SUCCEEDED,
      meetup
    };
    expect(actions.getSpecificMeetupSucceeded(meetup)).toEqual(expectedAction);
  });

  it('it should create an action of type FETCH_SPECIFIC_MEETUP_FAILED', () => {
    const expectedAction = {
      type: types.FETCH_SPECIFIC_MEETUP_FAILED
    };
    expect(actions.getSpecificMeetupFailed()).toEqual(expectedAction);
  });

  it('should create an action of type FETCH_SPECIFIC_MEETUP_START and FETCH_SPECIFIC_MEETUP_SUCCEEDED if successful', () => {
    mock.onGet('/meetups/23').reply(200, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'FETCH_SPECIFIC_MEETUP_START',
      'FETCH_SPECIFIC_MEETUP_SUCCEEDED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getSpecificMeetup(23))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  }, 10000);

  it('should create an action of type FETCH_SPECIFIC_MEETUP_START and FETCH_SPECIFIC_MEETUP_FAILED if not successful', () => {
    mock.onGet('/meetups/23').reply(500);

    const expectedActions = [
      'FETCH_SPECIFIC_MEETUP_START',
      'FETCH_SPECIFIC_MEETUP_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getSpecificMeetup(23))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  }, 10000);

  it('should create an action of type FETCH_MEETUPS_START and FETCH_MEETUPS_FAILED if  not successful', () => {
    mock.onGet('/meetups/23').reply(500);

    const expectedActions = [
      'FETCH_MEETUPS_START',
      'FETCH_MEETUPS_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.getAllMeetups(23))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  }, 10000);

  it('should create an action of type FETCH_MEETUPS_START and FETCH_MEETUPS_SUCCEEDED if  successful', () => {
    mock.onGet('/meetups/23').reply(200, {
      data: {
        data: []
      }
    });
    const expectedActions = [
      'FETCH_MEETUPS_START',
      'FETCH_MEETUPS_SUCCEEDED'
    ];
    const store = mockStore({});
    store.dispatch(actions.getAllMeetups())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  }, 10000);
});

describe('meetups reducer', () => {
  const initialState = {
    gettingMeetups: false,
    specificMeetup: {},
    meetups: [],
    error: null,
    loadingSpecificMeetup: false,
    loadSpecificMeetupFailed: false,
  };
  it('should return the initial state', () => {
    expect(AllMeetupReducer(undefined, {})).toEqual({
      gettingMeetups: false,
      specificMeetup: {},
      meetups: [],
      error: null,
      loadingSpecificMeetup: false,
      loadSpecificMeetupFailed: false,
    });
  });

  it('should return state with gettingMeetups set to true and error set to null', () => {
    expect(AllMeetupReducer(initialState, actions.getAllMeetupsStart())).toEqual({
      ...initialState,
      gettingMeetups: true,
      error: null
    });
  });

  it('should return state with gettingMeetups set to false, and meetups array and error set to null', () => {
    const meetup = [{}, {}];
    expect(AllMeetupReducer(initialState, actions.getAllMeetupsSucceeded(meetup))).toEqual({
      ...initialState,
      meetups: [{}, {}],
      gettingMeetups: false,
    });
  });

  it('getting all meetups failed', () => {
    const error = {};
    expect(AllMeetupReducer(initialState, actions.getAllMeetupsFailed(error))).toEqual({
      ...initialState,
      gettingMeetups: false,
      error: {}
    });
  });

  it('start getting specific meetup', () => {
    expect(AllMeetupReducer(initialState, actions.getSpecificMeetupStart())).toEqual({
      ...initialState,
      loadingSpecificMeetup: true
    });
  });

  it('getting specific meetup succeeded', () => {
    const meetup = {};
    expect(AllMeetupReducer(initialState, actions.getSpecificMeetupSucceeded(meetup))).toEqual({
      ...initialState,
      loadingSpecificMeetup: false,
      specificMeetup: {}
    });
  });

  it('getting specific meetup failed', () => {
    expect(AllMeetupReducer(initialState, actions.getSpecificMeetupFailed())).toEqual({
      ...initialState,
      loadingSpecificMeetup: false,
      loadingSpecificMeetupFailed: true
    });
  });
});
