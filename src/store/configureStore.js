import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import { rootReducer } from './reducers';

const getMiddleware = () => {
  const middleware = [reduxThunk];

  if (__DEV__) {
    if (process.env.LOGGER_ENABLED) {
      middleware.push(createLogger());
    }
  }

  return applyMiddleware(...middleware);
};
/**
 * create the redux store here
 */
const store = createStore(rootReducer, getMiddleware());

export const configureStore = store;
