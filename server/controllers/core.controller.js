import path from 'path';
import * as ReactRouter from 'react-router';
import Transmit from 'react-transmit';

const routesContainer = require(path.resolve('./client/containers/routes'));

exports.index = function index(req, res) {
  const location = '/';

  const routes = routesContainer;

  ReactRouter.match({ routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(`${redirectLocation.pathname}${redirectLocation.search}/`);
      return;
    }

    if (error || !renderProps) {
      // callback(error);
      res.status(400);
      return;
    }

    Transmit.renderToString(ReactRouter.RouterContext, renderProps)
      .then(({ reactString, reactData }) => {
        const template = (
`<!doctype html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <title>CodingBox.IO</title>
    <link rel="shortcut icon" href="/favicon.ico">
  </head>
  <body>
    <div id="react-root">${reactString}</div>
  </body>
</html>`
        );

        res.send(Transmit.injectIntoMarkup(template, reactData, [`/client.js`]));
      });
  });
};
