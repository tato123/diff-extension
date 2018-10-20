"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.admin = void 0;

var firebaseAdmin = _interopRequireWildcard(require("firebase-admin"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const admin = firebaseAdmin; // load our key

exports.admin = admin;

const serviceAccount = require('./key.json');

firebaseAdmin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
const dbInstance = admin.firestore();
exports.db = dbInstance;
const settings = {
  timestampsInSnapshots: true
};
dbInstance.settings(settings);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maXJlc3RvcmUvaW5kZXguanMiXSwibmFtZXMiOlsiYWRtaW4iLCJmaXJlYmFzZUFkbWluIiwic2VydmljZUFjY291bnQiLCJyZXF1aXJlIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWRlbnRpYWwiLCJjZXJ0IiwiZGF0YWJhc2VVUkwiLCJwcm9jZXNzIiwiZW52IiwiRklSRUJBU0VfREFUQUJBU0VfVVJMIiwiZGJJbnN0YW5jZSIsImZpcmVzdG9yZSIsInNldHRpbmdzIiwidGltZXN0YW1wc0luU25hcHNob3RzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFTyxNQUFNQSxLQUFLLEdBQUdDLGFBQWQsQyxDQUVQOzs7O0FBQ0EsTUFBTUMsY0FBYyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUE5Qjs7QUFFQUYsYUFBYSxDQUFDRyxhQUFkLENBQTRCO0FBQzFCQyxFQUFBQSxVQUFVLEVBQUVMLEtBQUssQ0FBQ0ssVUFBTixDQUFpQkMsSUFBakIsQ0FBc0JKLGNBQXRCLENBRGM7QUFFMUJLLEVBQUFBLFdBQVcsRUFBRUMsT0FBTyxDQUFDQyxHQUFSLENBQVlDO0FBRkMsQ0FBNUI7QUFLQSxNQUFNQyxVQUFVLEdBQUdYLEtBQUssQ0FBQ1ksU0FBTixFQUFuQjs7QUFDQSxNQUFNQyxRQUFRLEdBQUc7QUFBRUMsRUFBQUEscUJBQXFCLEVBQUU7QUFBekIsQ0FBakI7QUFDQUgsVUFBVSxDQUFDRSxRQUFYLENBQW9CQSxRQUFwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZpcmViYXNlQWRtaW4gZnJvbSAnZmlyZWJhc2UtYWRtaW4nO1xuXG5leHBvcnQgY29uc3QgYWRtaW4gPSBmaXJlYmFzZUFkbWluO1xuXG4vLyBsb2FkIG91ciBrZXlcbmNvbnN0IHNlcnZpY2VBY2NvdW50ID0gcmVxdWlyZSgnLi9rZXkuanNvbicpO1xuXG5maXJlYmFzZUFkbWluLmluaXRpYWxpemVBcHAoe1xuICBjcmVkZW50aWFsOiBhZG1pbi5jcmVkZW50aWFsLmNlcnQoc2VydmljZUFjY291bnQpLFxuICBkYXRhYmFzZVVSTDogcHJvY2Vzcy5lbnYuRklSRUJBU0VfREFUQUJBU0VfVVJMXG59KTtcblxuY29uc3QgZGJJbnN0YW5jZSA9IGFkbWluLmZpcmVzdG9yZSgpO1xuY29uc3Qgc2V0dGluZ3MgPSB7IHRpbWVzdGFtcHNJblNuYXBzaG90czogdHJ1ZSB9O1xuZGJJbnN0YW5jZS5zZXR0aW5ncyhzZXR0aW5ncyk7XG5leHBvcnQgeyBkYkluc3RhbmNlIGFzIGRiIH07XG4iXX0=