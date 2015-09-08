import {FETCH_GIFT} from '../Constants/ActionTypes';

const initialState = {};

export default function giftReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case FETCH_GIFT:
      state = Object.assign({}, action.gift);
      return state;

    default:
      return state;
  }
}
