import { combineReducers } from 'redux';
import friends from './userReducer'; //TODO change the path later
import friend from './friendReducer';
import gifts from './giftReducer';

const rootReducer = combineReducers({
  friends, // state for the friendsManager
  friend, // whose gift recommendation page we are on
  gifts
});

export default rootReducer;
