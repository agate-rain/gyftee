import { combineReducers } from 'redux';
import user from './userReducer'; //TODO change the path later
import friend from './friendReducer';
import gift from './giftReducer';
import gifts from './giftsReducer';

const rootReducer = combineReducers({
  user, // state for the friendsManager
  friend, // whose gift recommendation page we are on
  gift,
  gifts
});

export default rootReducer;
