import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../src/store/actions/homeActions';
import * as types from '../src/store/actions/actionTypes';
import homeReducer from '../src/store/reducers/homeReducer';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);

describe('Home actions', () => {
  it('should start getting random meetups action', () => {
    const expectedAction = {
      type: types.FETCH_RANDOM_MEETUPS_START
    };
    expect(actions.getRandomMeetupsStart()).toEqual(expectedAction);
  });

  it(' get random meetups succeeded action', () => {
    const expectedAction = {
      type: types.FETCH_RANDOM_MEETUPS_SUCCEEDED,
      randomMeetups: 'some-random-meetups',
    };
    expect(actions.getRandomMeetupsSucceeded('some-random-meetups')).toEqual(expectedAction);
  });

  it(' get trending meetups start action', () => {
    const expectedAction = {
      type: types.FETCH_TRENDING_MEETUPS_START,
    };
    expect(actions.getTrendingMeetupsStart()).toEqual(expectedAction);
  });

  it(' get trending meetups succeeded action', () => {
    const expectedAction = {
      type: types.FETCH_TRENDING_MEETUPS_SUCCEEDED,
      trendingMeetups: 'some-trending-meetups'
    };
    expect(actions.getTrendingMeetupsSucceeded('some-trending-meetups')).toEqual(expectedAction);
  });

  it('should get random meetup', () => {
    mock.onGet('/meetups/random/4').reply(200, {
      data: {
        data: []
      }
    });
    const expectedActions = [
      'FETCH_RANDOM_MEETUPS_START',
      'FETCH_RANDOM_MEETUPS_SUCCEEDED',
    ];
    const store = mockStore({});
    store.dispatch(actions.getRandomMeetups(4))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should get random meetup', () => {
    mock.onGet('/meetups/trending').reply(200, {
      data: {
        data: []
      }
    });
    const expectedActions = [
      'FETCH_TRENDING_MEETUPS_START',
      'FETCH_TRENDING_MEETUPS_SUCCEEDED',
    ];
    const store = mockStore({});
    store.dispatch(actions.getTrendingMeetups(4))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe('Home reducer', () => {
  const initialState = {
    loadingTrendingMeetups: false,
    trendingMeetups: [],
    loadingRandomMeetups: false,
    randomMeetups: [],
    error: null
  };

  it('should return the initial state', () => {
    expect(homeReducer(initialState, {})).toEqual({
      ...initialState
    });
  });

  it('should start getting random meetups - reducer', () => {
    expect(homeReducer(initialState, actions.getRandomMeetupsStart())).toEqual({
      ...initialState,
      loadingRandomMeetups: true,
      error: null
    });
  });

  it('should start getting trending meetups - reducer', () => {
    expect(homeReducer(initialState, actions.getTrendingMeetupsStart())).toEqual({
      ...initialState,
      loadingTrendingMeetups: true,
      error: null
    });
  });

  it('getting random meetups succeeded - reducer', () => {
    const meetups = [{}, {}];
    expect(homeReducer(initialState, actions.getRandomMeetupsSucceeded(meetups))).toEqual({
      ...initialState,
      loadingRandomMeetups: false,
      randomMeetups: [{}, {}]
    });
  });

  it('getting trending meetups succeeded - reducer', () => {
    const meetups = [{}, {}];
    expect(homeReducer(initialState, actions.getTrendingMeetupsSucceeded(meetups))).toEqual({
      ...initialState,
      loadingRandomMeetups: false,
      trendingMeetups: [{}, {}]
    });
  });
});
