import { combineReducers } from 'redux';
import friends from './userReducer'; //TODO change the path later

const rootReducer = combineReducers({
  friends // state for the friendsManager
});

export default rootReducer;
