// [START debug]
// Activate Google Cloud Trace and Debug when in production
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  require('@google-cloud/trace-agent').start();
  require('@google-cloud/debug-agent').start();
}
// [END debug]

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const SwaggerExpress = require('swagger-express-mw');

// import express dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const http = require('http');
const https = require('https');
const logging = require('./logging');

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

// setup express
const app = express();

module.exports = app; // for testing

const config = {
  appRoot: __dirname // required config
};

// ----------------------------------------------------
// configure parsing and cors rules
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

app.use(logging.requestLogger);

// ----------------------------------------------------
// create swagger
if (module === require.main) {
  SwaggerExpress.create(config, (err, swaggerExpress) => {
    if (err) {
      throw err;
    }

    // install middleware
    swaggerExpress.register(app);

    const port = process.env.PORT || 8080;
    app.listen(port);

    logging.debug(`Application running at: ${port}`);
  });
}
