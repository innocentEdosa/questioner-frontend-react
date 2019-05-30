import * as actions from '../actions/actionTypes';

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


const authLoading = state => ({
  ...state,
  error: null,
  loading: true
});

const authSuccessful = (state, action) => ({
  ...state,
  loading: false,
  error: null,
  isAuthenticated: true,
  user: action.user,
  token: action.token
});

const authFailed = (state, action) => ({
  ...state,
  loading: false,
  error: action.error,
  isAuthenticated: false,
});

const setAuthNav = (state, action) => ({
  ...state,
  authType: action.authType,
  error: null,
  authRedirectPath: action.path
});

const verifyUserStart = state => ({
  ...state,
  verifyingUser: true
});

const verifyUserSucceeded = (state, action) => ({
  ...state,
  verifyingUser: false,
  loading: false,
  error: null,
  isAuthenticated: true,
  user: action.user,
  token: action.token

});

const verifyUserFailed = state => ({
  ...state,
  verifyingUser: false,
  authType: 'login',
  loading: false,
  isAuthenticated: false,
  user: {},
  error: null,
  token: null,
  authRedirectPath: '/'
});

const logUserOut = state => ({
  ...state,
  verifyingUser: false,
  authType: 'login',
  loading: false,
  isAuthenticated: false,
  user: {},
  error: null,
  token: null,
  authRedirectPath: '/'
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADING: return authLoading(state, action);
    case actions.AUTH_SUCCESSFUL: return authSuccessful(state, action);
    case actions.AUTH_FAILED: return authFailed(state, action);
    case actions.AUTH_NAV: return setAuthNav(state, action);
    case actions.VERIFY_USER_START: return verifyUserStart(state);
    case actions.VERIFY_USER_SUCCEEDED: return verifyUserSucceeded(state, action);
    case actions.VERIFY_USER_FAILED: return verifyUserFailed(state);
    case actions.LOG_USER_OUT: return logUserOut(state);
    default:
      return state;
  }
};

export default authReducer;
