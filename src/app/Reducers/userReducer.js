import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS } from '../Constants/ActionTypes';

const initialState = [];

export default function userReducer(state=initialState, action) {

  switch (action.type) {
    case ADD_FRIEND:
      return [{
        id
      }, ...state];

    case REMOVE_FRIEND:
      return state.filter(friend => friend.id !== action.id);

    case FETCH_FRIENDS:
      return state = action.friends;

    default:
      return state;
  }

};
