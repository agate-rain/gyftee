import { createStore } from 'redux';
import rootReducer from '../Reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../Reducers', () => {
      const nextReducer = require('../Reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};
