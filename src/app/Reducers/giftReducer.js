import {FETCH_CURRENT_DISPLAYED_GIFT} from '../Constants/ActionTypes';

const initialState = {};

export default function userReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case FETCH_CURRENT_DISPLAYED_GIFT:
      return Object.assign({}, action.gift);

    default:
      return state;
  }
}
