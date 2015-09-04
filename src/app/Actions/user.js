import * as type from '../Constants/ActionTypes';

export function addFriend(id) {
  return {
    type: types.ADD_FRIEND,
    id
  };
};

export function removeFriend(id) {
  return {
    type: types.REMOVE_FRIEND,
    id
  };
};
