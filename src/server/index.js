
import express from 'express';
import compression from 'compression';
import path from 'path';
import React from 'react';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import moment from 'moment';
import { renderToString } from 'react-dom/server';
import RouterContext from 'react-router/lib/RouterContext';
import createMemoryHistory from 'react-router/lib/createMemoryHistory';
import match from 'react-router/lib/match';
import template from './template';
import routes from '../routes';
import Target from '../models/Target';
import Game from '../models/Game';

const clientAssets = require(KYT.ASSETS_MANIFEST); // eslint-disable-line import/no-dynamic-require
const port = process.env.PORT || parseInt(KYT.SERVER_PORT, 10);
const app = express();

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost/kiki';
mongoose.Promise = Promise;
mongoose.connect(mongoURL);

// Remove annoying Express header addition.
app.disable('x-powered-by');

// Compress (gzip) assets in production.
app.use(compression());

// Add bodyParser for json.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup the public directory so that we can server static assets.
app.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)));

app.get('/games', async (req, res) => {
  const date = await getLastDate(req.query.date);
  console.log({'$lte': new Date(), '$gte': date}, req.query.date);
  Game.find({ timestamp: { '$lte': new Date(), '$gte': date }})
    .then((games) => {
      res.json({games});
      res.end();
    })
    .catch(err => {
      res.json(err);
      res.end();
    })
});

app.post('/games', (req, res) => {
  console.log(req);
  const body = req.body;
  const { playTime, coins } = body;
  const newGame = new Game({ playTime, coins });
  newGame.save();
  // Target.find()
  //   .then(targets => targets.filter((target) => {if(target.)}))
});

async function getLastDate(date) {
  switch (date) {
    case 'total':
      return moment().subtract(30,'d').toDate();
      break;
    case 'month':
      return moment().subtract(30,'d').toDate();
      break;
    case 'week':
      return moment().subtract(7,'d').toDate();
      break;
    case 'day':
      return moment().subtract(1,'d').toDate();
      break;
    default:
      return moment().toDate();
      break;
  }
}

// Return targets
app.get('/targets', (req, res) => {
  //TODO: FIX SORTING.
  Target.find().sort({timestamp: 1}).exec()
    .then((targets) => {
      res.json({ targets });
      res.end();
    })
    .catch((err) => {
      res.json(err);
      res.end();
    })
});

app.post('/targets', (req, res) => {
  const target = new Target({
    title: `Verzamel ${req.body.value} ${req.body.target}`,
    target: req.body.target,
    value: req.body.value,
  });
  target.save()
    .then(newTarget => {
      res.json({ target: newTarget });
      res.end();
    })
    .catch(err => {
      res.json(err);
      res.end();
    });
});

// Setup server side routing.
app.get('*', (request, response) => {
  const history = createMemoryHistory(request.originalUrl);

  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`);
    } else if (renderProps) {
      // When a React Router route is matched then we render
      // the components and assets into the template.
      response.status(200).send(template({
        root: renderToString(<RouterContext {...renderProps} />),
        jsBundle: clientAssets.main.js,
        cssBundle: clientAssets.main.css,
      }));
    } else {
      response.status(404).send('Not found');
    }
  });
});

app.listen(port, () => {
  console.log(`✅  server started on port: ${port}`); // eslint-disable-line no-console
});
