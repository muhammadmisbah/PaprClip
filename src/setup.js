import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from 'navigation';
import { Snack } from 'snack';
import { configureStore } from './store';

const SetUp = () => {
  return (
    <Provider store={configureStore}>
      <AppContainer />
      <Snack />
    </Provider>
  );
};

export default SetUp;
