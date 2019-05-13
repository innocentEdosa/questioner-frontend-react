import * as actions from '../actions/actionTypes';

const initialState = {
  isCreateMeetupModal: false,
};

const meetupModalHandler = (state, action) => ({
  ...state,
  isCreateMeetupModal: action.shouldModalOpen,
});

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.OPEN_MEETUP_MODAL: return meetupModalHandler(state, action);
    case actions.CLOSE_MEETUP_MODAL: return meetupModalHandler(state, action);
    default:
      return state;
  }
};

export default adminReducer;
