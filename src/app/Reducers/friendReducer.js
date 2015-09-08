import {FETCH_FRIEND, SAVE_IMAGE_URL} from '../Constants/ActionTypes';

const initialState = {friend: null , image_url: null};

export default function friendReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case FETCH_FRIEND:
      state.friend = action.friend
      return state;

    case SAVE_IMAGE_URL:
      state.image_url = action.image_url
      return state;

    default:
      return state;
  }
}
