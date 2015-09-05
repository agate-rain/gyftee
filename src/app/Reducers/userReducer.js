import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS } from '../Constants/ActionTypes';

const initialState = [];

export default function userReducer(state=initialState, action) {

  switch (action.type) {
    case ADD_FRIEND:
      return [{
        id
      }, ...state];

    case REMOVE_FRIEND:
      // console.log("REMOVE_FRIEND called")
      console.log(state);
      // console.log("action id",action.id)
      // state = state[0];
      return state.filter(friend =>{
        console.log('action ID',action.id);
        friend.id !== action.id
      });

    case FETCH_FRIENDS:
      var friendIds = [];
      action.friends.forEach(function(friend){
        friendIds.push({'id' : friend.id});
      });
      return friendIds.concat(state)

    default:
      return state;
  }

};
