import * as actions from '../actions/actionTypes';

const initialState = {
  isCreateMeetupModal: false,
  creatingMeetup: false,
  gettingMeetups: false,
  meetups: [],
  error: null,
  deleteModal: false,
  meetupToDelete: {},
  deletingMeetup: false
};

const meetupModalHandler = (state, action) => ({
  ...state,
  isCreateMeetupModal: action.shouldModalOpen,
});

const createMeetupStart = state => ({
  ...state,
  creatingMeetup: true,
  error: null
});

const createMeetupSucceeded = (state, action) => {
  const newState = { ...state };
  newState.meetups = [...state.meetups, ...action.meetup];
  return {
    ...newState,
    creatingMeetup: false
  };
};

const createMeetupFailed = (state, action) => ({
  ...state,
  error: action.error,
  creatingMeetup: false,
});

const getAdminMeetupsStart = state => ({
  ...state,
  gettingMeetups: true,
  error: null,
});

const getAdminMeetupsSucceeded = (state, action) => ({
  ...state,
  gettingMeetups: false,
  error: null,
  meetups: action.adminMeetups
});

const getAdminMeetupsFailed = (state, action) => ({
  ...state,
  gettingMeetups: false,
  error: action.error,
});

const openDeleteModal = (state, action) => ({
  ...state,
  deleteModal: true,
  meetupToDelete: action.meetup
});

const cancelDeleteMeetup = state => ({
  ...state,
  deleteModal: false,
  meetupToDelete: {}
});

const deleteMeetupStart = state => ({
  ...state,
  deletingMeetup: true
});

const deleteMeetupSuccessful = (state, action) => {
  const meetups = state.meetups.filter(meetup => meetup.id !== action.meetup);
  return {
    ...state,
    meetups,
    deletingMeetup: false,
    deleteModal: false,
    meetupToDelete: {}
  };
};

const deleteMeetupFailed = state => ({
  ...state,
  deletingMeetup: false,
  deleteModal: false,
  meetupToDelete: {}
});

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_MEETUP_START: return createMeetupStart(state);
    case actions.CREATE_MEETUP_SUCCEEDED: return createMeetupSucceeded(state, action);
    case actions.CREATE_MEETUP_FAILED: return createMeetupFailed(state, action);
    case actions.OPEN_MEETUP_MODAL: return meetupModalHandler(state, action);
    case actions.CLOSE_MEETUP_MODAL: return meetupModalHandler(state, action);
    case actions.FETCH_ADMIN_MEETUPS_START: return getAdminMeetupsStart(state, action);
    case actions.FETCH_ADMIN_MEETUPS_SUCCEEDED: return getAdminMeetupsSucceeded(state, action);
    case actions.OPEN_DELETE_MODAL: return openDeleteModal(state, action);
    case actions.FETCH_ADMIN_MEETUPS_FAILED: return getAdminMeetupsFailed(state, action);
    case actions.CANCEL_MEETUP_DELETE: return cancelDeleteMeetup(state);
    case actions.DELETE_MEETUP_START: return deleteMeetupStart(state);
    case actions.DELETE_MEETUP_SUCCESSFUL: return deleteMeetupSuccessful(state, action);
    case actions.DELETE_MEETUP_FAILED: return deleteMeetupFailed(state);
    default:
      return state;
  }
};

export default adminReducer;
