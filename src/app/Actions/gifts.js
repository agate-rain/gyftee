import * as types from '../Constants/ActionTypes';

export function saveGifts(arrayGift) {
  return {
    type: types.SAVE_GIFTS,
    gifts: arrayGift
  };
};

export function initGifts() {
  return {
    type: types.INIT_GIFTS
  };
};

