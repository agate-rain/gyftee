import { ADD_FRIEND, REMOVE_FRIEND } from '../Constants/ActionTypes';

const initialState = {
  friends: [{id: 1989}]
};

export default function userReducer(state=initialState, action) {

  switch (action.type) {
    case ADD_FRIEND:
      return [{
        id
      }, ...state];

    case REMOVE_FRIEND:
      return state.filter(friend => friend.id !== action.id);

    default:
      return state;
  }

};
