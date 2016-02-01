import _ from 'lodash';
import path from 'path';
import * as ReactRouter from 'react-router';
import Transmit from 'react-transmit';

const routesContainer = require(path.resolve('./client/containers/routes'));

global.__SERVER__ = true;

exports.index = function index(req, res) {
  const webserver = process.env.NODE_ENV === 'production' ? '' : `//${req.hostname}:8080`;

  const location = req.originalUrl;

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
        const cssFiles = _.map(res.app.locals.cssFiles,
         (cssFile) => {
           if (_.isString(cssFile)) {
             return `<link rel="stylesheet" href="${cssFile}" />`;
           }

           return `<link rel="stylesheet" integrity="${cssFile.integrity}"` +
                  ` href="${cssFile.href}" crossorigin="anonymous" />`;
         }).join('');

        const template = (
`<!doctype html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <base href="/">
    <title>${res.app.locals.title}</title>
    <meta name="description" content="${res.app.locals.description}">
    <link rel="shortcut icon" href="/favicon.ico">

    <!-- Apple META -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <!-- Facebook META -->
    <meta property="fb:app_id" content="${res.app.locals.facebookAppId}">
    <meta property="og:site_name" content="${res.app.locals.title}">
    <meta property="og:locale" content="en_US">
    <meta property="og:title" content="${res.app.locals.title}">
    <meta property="og:description" content="${res.app.locals.description}">
    <meta property="og:url" content="${res.locals.url}">
    <meta property="og:image" content="${res.app.locals.logo}">
    <meta property="og:card" content="summary">
    <meta property="og:type" content="website">
    <meta property="og:site" content="@viatsko">
    <meta property="og:creator" content="@viatsko">

    <!-- Twitter META -->
    <meta name="twitter:title" content="${res.app.locals.title}">
    <meta name="twitter:description" content="${res.app.locals.description}">
    <meta name="twitter:url" content="${res.locals.url}">
    <meta name="twitter:image" content="${res.app.locals.logo}">

    <!-- Fav Icon -->
    <link href="${res.app.locals.favicon}" rel="shortcut icon" type="image/x-icon">

    <!-- CSS Files -->
    ${cssFiles}
  </head>
  <body>
    <div id="react-root">${reactString}</div>

    <!--Load The Socket.io File-->
    <script type="text/javascript" src="/socket.io/socket.io.js"></script>
  </body>
</html>`
        );

        res.send(Transmit.injectIntoMarkup(template, reactData, [`${webserver}/client.js`]));
      });
  });
};
