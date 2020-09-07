import React from 'react';
import { Provider } from 'react-redux';
import getStore from '../../redux/getStore';
import Greetings from '../Greetings';

export default () => (
  <Provider store={getStore(window.__PRELOADED_STATE__)}>
    <Greetings />
  </Provider>
);
