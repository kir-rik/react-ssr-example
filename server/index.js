import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import Client from '../client/src/components/App/index.jsx';

const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  const client = ReactDOMServer.renderToString(<Client />);

  const indexFile = path.resolve('./dist/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Мы обязательно это починим');
    }

    return res.send(data.replace('<div id="root"></div>', `<div id="root">${client}</div>`));
  });
});

app.use(express.static('./dist'));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
