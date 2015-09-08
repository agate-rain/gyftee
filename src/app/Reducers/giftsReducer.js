import {SAVE_GIFTS} from '../Constants/ActionTypes';

const initialState = {};

export default function giftsReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case SAVE_GIFTS:
      console.log('ACTION',action)
      state = Object.assign({}, action.gifts);
      console.log('STATE',state)
      return state;

    default:
      return state;
  }
}
