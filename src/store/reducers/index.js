import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import AllMeetupsReducer from './AllMeetupsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  AllMeetups: AllMeetupsReducer,
});

export default rootReducer;
