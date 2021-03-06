import {SAVE_GIFTS, INIT_GIFTS} from '../Constants/ActionTypes';

const initialState = [];

export default function giftsReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {

    case INIT_GIFTS:
      return [];

    case SAVE_GIFTS:
      //state = Object.assign({}, state["gifts"], action.gifts);
      return [...state, ...action.gifts];

    default:
      return state;
  }
}
