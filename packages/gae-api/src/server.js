import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './logging';
import routes from './api/v1';

if (process.env.ENV_ACTIVE !== 'yes') {
  throw new Error('Environment config not loaded');
}

// setup express
const app = express();
const port = process.env.PORT || 8080;

app.disable('etag');
app.set('trust proxy', true);
app.use(bodyParser.raw());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse plain text
app.use(bodyParser.text());
// configure cors
app.use(
  cors({
    origin: true
  })
);

app.use(compression());

app.use('/', routes);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.send(500);
});

// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  require('@google-cloud/trace-agent').start();
  require('@google-cloud/debug-agent').start();
  app.use(logging.requestLogger);
}

if (module === require.main) {
  app.listen(port, () => {
    logging.info(`App listening on port ${port}!`);
  });
}
