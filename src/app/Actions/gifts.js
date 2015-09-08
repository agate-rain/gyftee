import * as types from '../Constants/ActionTypes';

export function saveGifts(arrayGift) {
  return {
    type : types.SAVE_GIFTS,
    gifts : arrayGift
  };
};
