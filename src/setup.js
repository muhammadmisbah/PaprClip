import React from 'react';
import { Provider } from 'react-redux';
import { AppContainer } from '@navigation';
import { configureStore } from './store';

const SetUp = () => {
  return (
    <Provider store={configureStore}>
      <AppContainer />
    </Provider>
  );
};

export default SetUp;
