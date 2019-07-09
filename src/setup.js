import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from '@navigation';
import { configureStore } from './store';
import { Snack } from '@snack';

const SetUp = () => {
  return (
    <Provider store={configureStore}>
      <AppContainer />
      <Snack />
    </Provider>
  );
};

export default SetUp;
