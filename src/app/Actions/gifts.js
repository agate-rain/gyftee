import * as types from '../Constants/ActionTypes';

export function saveGifts(arrayGift) {
  console.log(arrayGift.Items.Item)
  return {
    type : types.SAVE_GIFTS,
    gifts : arrayGift
  };
};
