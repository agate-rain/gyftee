import * as types from '../Constants/ActionTypes';

export function save(giftListId, giftId) {
  return {
    type: types.ADD_GIFT,
    id
  };
};

export function removeFriend(id) {
  return {
    type: types.REMOVE_GIFT,
    id
  };
};
