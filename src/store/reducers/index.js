import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import AllMeetupsReducer from './meetupsReducer';
import homeReducer from './homeReducer';
import questionReducer from './questionReducer';
import rsvpReducer from './rsvpReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  allMeetups: AllMeetupsReducer,
  home: homeReducer,
  rsvp: rsvpReducer,
  question: questionReducer,
  profile: profileReducer,
});

export default rootReducer;
