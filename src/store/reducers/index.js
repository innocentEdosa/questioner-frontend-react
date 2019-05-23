import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import AllMeetupsReducer from './meetupsReducer';
import homeReducer from './homeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  allMeetups: AllMeetupsReducer,
  home: homeReducer,
});

export default rootReducer;
