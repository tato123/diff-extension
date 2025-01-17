import compression from 'compression';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './logging';
import routes from './api/v1';

const cookieParser = require('cookie-parser');
const cors = require('cors');

if (process.env.ENV_ACTIVE !== 'yes') {
  throw new Error('Environment config not loaded');
}

// setup express
const app = express();
const port = process.env.PORT || 8080;

app.disable('etag');
app.set('trust proxy', true);

app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(bodyParser.raw());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse plain text
app.use(bodyParser.text());
// configure cors
app.use(compression());

app.use('/', routes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  logging.error(err);
  res.send(500);
});

// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
  app.use(logging.requestLogger);
}

app.listen(port, '0.0.0.0', () => {
  logging.info(`App listening on port ${port}!`);
});
