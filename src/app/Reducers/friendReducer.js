import {FETCH_FRIEND, SAVE_IMAGE_URL, SAVE_WISHLIST} from '../Constants/ActionTypes';

const initialState = {friend: null , image_url: null, wishlist: null};

export default function friendReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case FETCH_FRIEND:
      return Object.assign({}, state, {friend: action.friend});

    case SAVE_IMAGE_URL:
      return Object.assign({}, state, {image_url: action.image_url});

    case SAVE_WISHLIST:
      return Object.assign({}, state, {wishlist: action.wishlist});

    default:
      return state;
  }
}
