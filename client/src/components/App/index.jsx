import React from 'react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Greetings from '../Greetings';

export default () => (
  <Provider store={store}>
    <Greetings />
  </Provider>
);
