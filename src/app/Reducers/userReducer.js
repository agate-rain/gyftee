import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS, GET_USER } from '../Constants/ActionTypes';

const initialState = { profile: {}, friends: [] };

export default function userReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case ADD_FRIEND:
      return [{
        id
      }, ...state];

    case REMOVE_FRIEND:
      var friends = state.friends.filter(friend => {
        return friend.id !== action.id
      });
      return Object.assign({}, { profile: state.profile, friends: friends });

    case FETCH_FRIENDS:
      // var friends = [];
      // action.friends.forEach(function(friend) {
      //   friends.push(friend);
      // });
    console.log("state in FETCH_FRIENDS", state)
      return Object.assign({}, state, { friends: action.friends });

    case GET_USER:
    console.log("state in GET_USER", state)

      return Object.assign({}, state, { profile: action.profile });

    default:
      return state;

  }

};
