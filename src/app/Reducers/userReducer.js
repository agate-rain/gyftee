import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS } from '../Constants/ActionTypes';

const initialState = [];

export default function userReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case ADD_FRIEND:
      return [{
        id
      }, ...state];

    case REMOVE_FRIEND:
      return state.filter(friend => {
        return friend.id !== action.id
      });

    case FETCH_FRIENDS:
      var friends = [];
      action.friends.forEach(function(friend) {
        friends.push(friend);
      });
      return friends;

    default:
      return state;
  }

};
