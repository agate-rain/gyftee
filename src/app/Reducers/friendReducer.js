import {FETCH_FRIEND} from '../Constants/ActionTypes';

const initialState = {};

export default function friendReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case FETCH_FRIEND:
      state = Object.assign({}, action.friend);
      return state;

    default:
      return state;
  }
}
