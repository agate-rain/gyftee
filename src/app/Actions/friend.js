import * as types from '../Constants/ActionTypes';

export function fetchFriend(friend) {
  return {
    type: types.FETCH_FRIEND,
    friend: friend
  };
};

export function saveImageUrl(url) {
  return {
    type: types.SAVE_IMAGE_URL,
    image_url: url
  };
};

export function saveWishlist(wishlist) {
  return {
    type: types.SAVE_WISHLIST,
    wishlist: wishlist
  };
};
