/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import Promise from 'bluebird'
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { setSetting } from './actions/setting';
import { port, auth, mongoDBURL} from './config';
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

//mongoose
import mongoose from 'mongoose'
mongoose.Promise = Promise;
connect()
const Setting = mongoose.model('Setting')
// var User =  mongoose.model('User', require('./data/models/user/userSchema'))
//end


const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  cookie: { maxAge: (24*3600*1000*30)},
  resave: true,
  saveUninitialized: false,
  secret: 'luuVANluan',
  ttl: 7 * 24 * 60 * 60,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
//
// Authentication
// -----------------------------------------------------------------------------

if (__DEV__) {
  app.enable('trust proxy');
}

app.use('/image', require('./serverRoute/image'))
app.use('/api', require('./serverRoute/api'))
app.use('/upload', require('./serverRoute/upload'))
app.use('/auth', require('./serverRoute/auth'))
//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: __DEV__,
  rootValue: { request: req },
  pretty: __DEV__,
})));


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.get('*', async (req, res, next) => {
  try {
    let setting = await Setting.findOne({})
    const store = configureStore({
      user: req.user || null,
    }, {
      cookie: req.headers.cookie,
    });
    store.dispatch(setSetting({
      value: setting.ssr
    }))
    store.dispatch(setRuntimeVariable({
      name: 'initialNow',
      value: Date.now(),
    }));
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };

    if(data.disableSSR || !store.getState().setting.ssr) {
      data.children = '';
    } else {
      data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    }

    data.styles = [
      { id: 'css', cssText: [...css].join('') },
    ];
    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];
    data.state = context.store.getState();
    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } }, promiseLibrary: Promise };
  return mongoose.connect(mongoDBURL, options).connection;
}
