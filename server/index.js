import path from 'path';
import fs from 'fs';

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import Client from '../client/src/components/Greetings/index.jsx';
import rootReducer from '../client/src/redux/reducers/index.js';
import { CHANGE_USERNAME } from '../client/src/redux/actionTypes.js';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  const store = createStore(rootReducer);

  store.dispatch({
    type: CHANGE_USERNAME,
    payload: {
      userName: 'Server username'
    }
  })

  const preloadedState = store.getState();

  const client = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Client />
    </Provider>
  );

  const indexFile = path.resolve('./dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Мы обязательно это починим');
    }

    const withApp = data.replace('<div id="root"></div>', `<div id="root">${client}</div>`);
    const withStore = withApp.replace(
      '<div id="root">',
      `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script><div id="root">`
    );

    return res.send(withStore);
  });
});

app.use(express.static('./dist'));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
