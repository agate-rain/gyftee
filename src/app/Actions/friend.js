import * as types from '../Constants/ActionTypes';

export function fetchFriend(json) {
  return {
    type: types.FETCH_FRIEND,
    friend: json
  };
};
