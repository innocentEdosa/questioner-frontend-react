import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import AllMeetupsReducer from './AllMeetupsReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  AllMeetups: AllMeetupsReducer,
  home: homeReducer,
});

export default rootReducer;
