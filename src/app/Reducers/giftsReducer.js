import {SAVE_GIFTS} from '../Constants/ActionTypes';

const initialState = {};

export default function giftsReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case SAVE_GIFTS:
      state = Object.assign({}, action.gifts);
      return state;

    default:
      return state;
  }
}
