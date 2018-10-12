"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
transporter.use('compile', hbs({
  viewEngine: {
    defaultLayout: 'base',
    layoutsDir: path.resolve(__dirname, './templates')
  },
  viewPath: path.resolve(__dirname, './templates'),
  extension: '.hbs'
}));
var _default = transporter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbWFpbC90cmFuc3BvcnRlci5qcyJdLCJuYW1lcyI6WyJwYXRoIiwicmVxdWlyZSIsIm5vZGVtYWlsZXIiLCJtZyIsImhicyIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJNQUlMR1VOX0FQSV9LRVkiLCJkb21haW4iLCJNQUlMR1VOX0RPTUFJTiIsImF1dGgiLCJhcGlfa2V5IiwidHJhbnNwb3J0ZXIiLCJjcmVhdGVUcmFuc3BvcnQiLCJ1c2UiLCJ2aWV3RW5naW5lIiwiZGVmYXVsdExheW91dCIsImxheW91dHNEaXIiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwidmlld1BhdGgiLCJleHRlbnNpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUNBLE1BQU1DLFVBQVUsR0FBR0QsT0FBTyxDQUFDLFlBQUQsQ0FBMUI7O0FBQ0EsTUFBTUUsRUFBRSxHQUFHRixPQUFPLENBQUMsOEJBQUQsQ0FBbEI7O0FBQ0EsTUFBTUcsR0FBRyxHQUFHSCxPQUFPLENBQUMsK0JBQUQsQ0FBbkI7O0FBRUEsTUFBTUksTUFBTSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsZUFBM0I7QUFDQSxNQUFNQyxNQUFNLEdBQUdILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxjQUEzQjtBQUVBLE1BQU1DLElBQUksR0FBRztBQUNYQSxFQUFBQSxJQUFJLEVBQUU7QUFDSkMsSUFBQUEsT0FBTyxFQUFFUCxNQURMO0FBRUpJLElBQUFBO0FBRkk7QUFESyxDQUFiO0FBT0EsTUFBTUksV0FBVyxHQUFHWCxVQUFVLENBQUNZLGVBQVgsQ0FBMkJYLEVBQUUsQ0FBQ1EsSUFBRCxDQUE3QixDQUFwQjtBQUVBRSxXQUFXLENBQUNFLEdBQVosQ0FDRSxTQURGLEVBRUVYLEdBQUcsQ0FBQztBQUNGWSxFQUFBQSxVQUFVLEVBQUU7QUFDVkMsSUFBQUEsYUFBYSxFQUFFLE1BREw7QUFFVkMsSUFBQUEsVUFBVSxFQUFFbEIsSUFBSSxDQUFDbUIsT0FBTCxDQUFhQyxTQUFiLEVBQXdCLGFBQXhCO0FBRkYsR0FEVjtBQUtGQyxFQUFBQSxRQUFRLEVBQUVyQixJQUFJLENBQUNtQixPQUFMLENBQWFDLFNBQWIsRUFBd0IsYUFBeEIsQ0FMUjtBQU1GRSxFQUFBQSxTQUFTLEVBQUU7QUFOVCxDQUFELENBRkw7ZUFZZVQsVyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBub2RlbWFpbGVyID0gcmVxdWlyZSgnbm9kZW1haWxlcicpO1xuY29uc3QgbWcgPSByZXF1aXJlKCdub2RlbWFpbGVyLW1haWxndW4tdHJhbnNwb3J0Jyk7XG5jb25zdCBoYnMgPSByZXF1aXJlKCdub2RlbWFpbGVyLWV4cHJlc3MtaGFuZGxlYmFycycpO1xuXG5jb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5NQUlMR1VOX0FQSV9LRVk7XG5jb25zdCBkb21haW4gPSBwcm9jZXNzLmVudi5NQUlMR1VOX0RPTUFJTjtcblxuY29uc3QgYXV0aCA9IHtcbiAgYXV0aDoge1xuICAgIGFwaV9rZXk6IGFwaUtleSxcbiAgICBkb21haW5cbiAgfVxufTtcblxuY29uc3QgdHJhbnNwb3J0ZXIgPSBub2RlbWFpbGVyLmNyZWF0ZVRyYW5zcG9ydChtZyhhdXRoKSk7XG5cbnRyYW5zcG9ydGVyLnVzZShcbiAgJ2NvbXBpbGUnLFxuICBoYnMoe1xuICAgIHZpZXdFbmdpbmU6IHtcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdiYXNlJyxcbiAgICAgIGxheW91dHNEaXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3RlbXBsYXRlcycpXG4gICAgfSxcbiAgICB2aWV3UGF0aDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vdGVtcGxhdGVzJyksXG4gICAgZXh0ZW5zaW9uOiAnLmhicydcbiAgfSlcbik7XG5cbmV4cG9ydCBkZWZhdWx0IHRyYW5zcG9ydGVyO1xuIl19