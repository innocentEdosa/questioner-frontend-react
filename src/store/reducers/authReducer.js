import * as actions from '../actions/actionTypes';

const getState = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const initialState = (user && token) ? {
    authType: 'login',
    loading: false,
    isAuthenticated: true,
    user,
    error: null,
    token,
    authRedirectPath: '/'
  } : {
    authType: 'login',
    loading: false,
    isAuthenticated: false,
    user: {},
    error: null,
    token: null,
    authRedirectPath: '/'
  };

  return initialState;
};

const initialState = getState();


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
  error: null
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADING: return authLoading(state, action);
    case actions.AUTH_SUCCESSFUL: return authSuccessful(state, action);
    case actions.AUTH_FAILED: return authFailed(state, action);
    case actions.AUTH_NAV: return setAuthNav(state, action);
    default:
      return state;
  }
};

export default authReducer;
