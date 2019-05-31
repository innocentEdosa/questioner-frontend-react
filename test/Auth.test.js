import configureStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../src/store/actions/authActions';
import * as types from '../src/store/actions/actionTypes';
import authReducer from '../src/store/reducers/authReducer';

const mockStore = configureStore([thunk]);
const mock = new MockAdapter(axios);

describe('auth action', () => {
  it('should start auth - action', () => {
    const expectedAction = {
      type: types.LOADING
    };
    expect(actions.authStart()).toEqual(expectedAction);
  });

  it('auth successful - action', () => {
    const expectedAction = {
      type: types.AUTH_SUCCESSFUL,
      token: 'some-token',
      user: 'some-user'
    };
    expect(actions.authSuccessful('some-token', 'some-user')).toEqual(expectedAction);
  });

  it('auth failed - action', () => {
    const expectedAction = {
      type: types.AUTH_FAILED,
      error: {}
    };
    expect(actions.authFailed({})).toEqual(expectedAction);
  });

  it('select authType - action', () => {
    const expectedAction = {
      type: types.AUTH_NAV,
      authType: 'auth-type',
      path: '/'
    };
    expect(actions.authType('auth-type', '/')).toEqual(expectedAction);
  });

  it('should signup a user', () => {
    mock.onPost('/auth/signup').reply(201, {
      data: {
        data: []
      }
    });

    const expectedActions = [
      'LOADING',
    ];

    const store = mockStore({});
    return store.dispatch(actions.signUp('innocent234', 'ile234g@gmail.com', '12345678'))
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should login a user', () => {
    mock.onPost('/auth/login').reply(201, {
      data: {
        data: {
          data: {

          }
        }
      }
    });
    const expectedActions = [
      'LOADING',
    ];
    const store = mockStore({});
    return store.dispatch(actions.logIn())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should fail on signup a user', () => {
    mock.onPost('/auth/signup').reply(500, {
      data: {
        error: {}
      }
    });

    const expectedActions = [
      'LOADING',
      'AUTH_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.signUp())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });


  it('should fail to login a user', () => {
    mock.onPost('/auth/login').reply(500, {
      data: {
        error: {}
      }
    });
    const expectedActions = [
      'LOADING',
      'AUTH_FAILED'
    ];
    const store = mockStore({});
    return store.dispatch(actions.logIn())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('log out user - action', () => {
    const expectedAction = {
      type: types.LOG_USER_OUT
    };
    expect(actions.logOut()).toEqual(expectedAction);
  });

  it('log out user - action', () => {
    const expectedActions = [
      'LOG_USER_OUT'
    ];
    const store = mockStore({});
    store.dispatch(actions.logOutUser());
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('select auth nav - action', () => {
    const expectedActions = [
      'AUTH_NAV'
    ];
    const store = mockStore({});
    store.dispatch(actions.authNav('auth-form', '/'));
    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('verify user - action', () => {
    const expectedAction = {
      type: types.VERIFY_USER_START
    };
    expect(actions.verifyUserStart()).toEqual(expectedAction);
  });

  it('verify user succeeded - action', () => {
    const expectedAction = {
      type: types.VERIFY_USER_SUCCEEDED,
      token: 'some-token',
      user: 'some-user'
    };
    expect(actions.verifyUserSucceeded('some-token', 'some-user')).toEqual(expectedAction);
  });

  it('verify user failed - action', () => {
    const expectedAction = {
      type: types.VERIFY_USER_FAILED,
    };
    expect(actions.verifyUserFailed('some-token', 'some-user')).toEqual(expectedAction);
  });


  it('should verify a user successfully - action', () => {
    mock.onGet('/auth/verify').reply(200, {
      data: {
        data: []
      }
    });
    const expectedActions = [
      'VERIFY_USER_START',
      'VERIFY_USER_SUCCEEDED',
    ];
    const store = mockStore({});
    store.dispatch(actions.verifyUser())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });

  it('should get random ', () => {
    mock.onGet('/auth/verify').reply(500);
    const expectedActions = [
      'VERIFY_USER_START',
      'VERIFY_USER_FAILED',
    ];
    const store = mockStore({});
    store.dispatch(actions.verifyUser())
      .then((response) => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
      });
  });
});

describe(' auth reducer ', () => {
  const initialState = {
    verifyingUser: false,
    authType: 'login',
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    token: null,
    authRedirectPath: '/'
  };
  it('should return the initial state', () => {
    expect(authReducer(initialState, {})).toEqual({
      ...initialState
    });
  });

  it('start auth ', () => {
    expect(authReducer(initialState, actions.authStart())).toEqual({
      ...initialState,
      error: null,
      loading: true
    });
  });

  it('successful auth', () => {
    expect(authReducer(initialState, actions.authSuccessful())).toEqual({
      ...initialState,
      loading: false,
      error: null,
      isAuthenticated: true,
      user: actions.user,
      token: actions.token
    });
  });

  it('failed auth', () => {
    expect(authReducer(initialState, actions.authFailed())).toEqual({
      ...initialState,
      loading: false,
      error: actions.error,
      isAuthenticated: false,
    });
  });

  it('set nav', () => {
    expect(authReducer(initialState, actions.authType('login', '/'))).toEqual({
      ...initialState,
      authType: 'login',
      error: null,
      authRedirectPath: '/'
    });
  });

  it('verify user start', () => {
    expect(authReducer(initialState, actions.verifyUserStart())).toEqual({
      ...initialState,
      verifyingUser: true
    });
  });

  it('verify user succeeded', () => {
    expect(authReducer(initialState, actions.verifyUserSucceeded())).toEqual({
      ...initialState,
      verifyingUser: false,
      loading: false,
      error: null,
      isAuthenticated: true,
      user: actions.user,
      token: actions.token
    });
  });

  it('verify user failed', () => {
    expect(authReducer(initialState, actions.verifyUserFailed())).toEqual({
      ...initialState,
      verifyingUser: false,
      authType: 'login',
      loading: false,
      isAuthenticated: false,
      user: {},
      error: null,
      token: null,
      authRedirectPath: '/'
    });
  });

  it('verify user failed', () => {
    expect(authReducer(initialState, actions.logOut())).toEqual({
      ...initialState,
      verifyingUser: false,
      authType: 'login',
      loading: false,
      isAuthenticated: false,
      user: {},
      error: null,
      token: null,
      authRedirectPath: '/'
    });
  });
});
