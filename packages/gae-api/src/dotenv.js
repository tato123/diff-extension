const path = require('path');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV;

console.log('Environment is', env);

if (env === 'production') {
  dotenv.config({
    path: path.resolve(__dirname, `../env/.env.${env}`)
  });
} else {
  dotenv.config({
    path: path.resolve(__dirname, `../../../.env.${env}`)
  });
}
console.log('running dotenv', process.env.IS_PRESENT);
