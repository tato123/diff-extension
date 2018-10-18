const path = require('path');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const hbs = require('nodemailer-express-handlebars');

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;

const auth = {
  auth: {
    api_key: apiKey,
    domain
  }
};

const transporter = nodemailer.createTransport(mg(auth));

transporter.use(
  'compile',
  hbs({
    viewEngine: {
      defaultLayout: 'base',
      layoutsDir: path.resolve(__dirname, './templates')
    },
    viewPath: path.resolve(__dirname, './templates'),
    extension: '.hbs'
  })
);

export default transporter;
