import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../Reducers';

export default function configureStore(initialState) {

  const logger = createLogger();
  const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../Reducers', () => {
      const nextReducer = require('../Reducers');
      store.replaceReducer(nextReducer);
    });
  }
  return store;
};
