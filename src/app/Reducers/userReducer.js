import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS, GET_USER } from '../Constants/ActionTypes';

const initialState = { profile: null, friends: [] };

export default function userReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case ADD_FRIEND:
      return Object.assign({}, state, {
        friends: state.friends.concat([action.friend])
      });

    case REMOVE_FRIEND:
      var friends = state.friends.filter(friend => {
        return friend.id !== action.id;
      });
      return Object.assign({}, state, { friends: friends });

    case FETCH_FRIENDS:
      var friends = [];
      action.friends.forEach(function(friend) {
        friends.push(friend);
      });
      return Object.assign({}, state, { friends: friends });

    case GET_USER:
      return Object.assign({}, state, { profile: action.profile });

    default:
      return state;

  }

};
