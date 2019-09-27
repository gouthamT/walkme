import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from 'styled-components';
import serialize from "serialize-javascript";

import App from '../../client/components/app';

import { Provider } from "react-redux";
import createStore, { initializeData } from '../../client/store/index';

import { getAllMatchingWalkMeFilesInfo } from '../helpers/fileHelper';

const sheet = new ServerStyleSheet();
async function defaultView(req, res) {
  const walkmes = await getAllMatchingWalkMeFilesInfo(), store = createStore();
  store.dispatch(initializeData(walkmes));
  let reactDom = renderToString(<Provider store={store}><App /></Provider>), styleTags;
  try {
    styleTags = sheet.getStyleTags();
  } catch (error) {
    console.error(error)
  } finally {
    sheet.seal()
  }
  res.send(`
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="icon" type="image/ico" href="public/favicon.ico">
      <title>walkme</title>
      ${styleTags}
    </head>
    <body>
      <div id="app">${reactDom}</div>
      <script>
          window.REDUX_DATA = ${ serialize(store.getState(), { isJSON: true })}
      </script>
      <script src="public/scripts/client.js"></script>
    </body>
  </html>`);
}

export default defaultView;