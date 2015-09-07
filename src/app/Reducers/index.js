import { combineReducers } from 'redux';
import friends from './userReducer'; //TODO change the path later
import friend from './friendReducer';

const rootReducer = combineReducers({
  friends, // state for the friendsManager
  friend
});

export default rootReducer;
