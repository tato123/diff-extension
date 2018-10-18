"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _transporter = _interopRequireDefault(require("./transporter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultFrom = 'Diff <diff-noreply@getdiff.app>';

const signupEmail = ({
  from = defaultFrom,
  to,
  name
}) => {
  const mail = {
    from,
    to,
    subject: 'Beta Signup',
    template: 'earlySignup',
    context: {
      title: `You're signed up for the early beta, ${name}`
    }
  };
  return _transporter.default.sendMail(mail);
};

var _default = {
  signupEmail
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbWFpbC9tZXNzYWdlcy5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0RnJvbSIsInNpZ251cEVtYWlsIiwiZnJvbSIsInRvIiwibmFtZSIsIm1haWwiLCJzdWJqZWN0IiwidGVtcGxhdGUiLCJjb250ZXh0IiwidGl0bGUiLCJ0cmFuc3BvcnRlciIsInNlbmRNYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxNQUFNQSxXQUFXLEdBQUcsaUNBQXBCOztBQUVBLE1BQU1DLFdBQVcsR0FBRyxDQUFDO0FBQUVDLEVBQUFBLElBQUksR0FBR0YsV0FBVDtBQUFzQkcsRUFBQUEsRUFBdEI7QUFBMEJDLEVBQUFBO0FBQTFCLENBQUQsS0FBc0M7QUFDeEQsUUFBTUMsSUFBSSxHQUFHO0FBQ1hILElBQUFBLElBRFc7QUFFWEMsSUFBQUEsRUFGVztBQUdYRyxJQUFBQSxPQUFPLEVBQUUsYUFIRTtBQUlYQyxJQUFBQSxRQUFRLEVBQUUsYUFKQztBQUtYQyxJQUFBQSxPQUFPLEVBQUU7QUFDUEMsTUFBQUEsS0FBSyxFQUFHLHdDQUF1Q0wsSUFBSztBQUQ3QztBQUxFLEdBQWI7QUFTQSxTQUFPTSxxQkFBWUMsUUFBWixDQUFxQk4sSUFBckIsQ0FBUDtBQUNELENBWEQ7O2VBYWU7QUFDYkosRUFBQUE7QUFEYSxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRyYW5zcG9ydGVyIGZyb20gJy4vdHJhbnNwb3J0ZXInO1xuXG5jb25zdCBkZWZhdWx0RnJvbSA9ICdEaWZmIDxkaWZmLW5vcmVwbHlAZ2V0ZGlmZi5hcHA+JztcblxuY29uc3Qgc2lnbnVwRW1haWwgPSAoeyBmcm9tID0gZGVmYXVsdEZyb20sIHRvLCBuYW1lIH0pID0+IHtcbiAgY29uc3QgbWFpbCA9IHtcbiAgICBmcm9tLFxuICAgIHRvLFxuICAgIHN1YmplY3Q6ICdCZXRhIFNpZ251cCcsXG4gICAgdGVtcGxhdGU6ICdlYXJseVNpZ251cCcsXG4gICAgY29udGV4dDoge1xuICAgICAgdGl0bGU6IGBZb3UncmUgc2lnbmVkIHVwIGZvciB0aGUgZWFybHkgYmV0YSwgJHtuYW1lfWBcbiAgICB9XG4gIH07XG4gIHJldHVybiB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lnbnVwRW1haWxcbn07XG4iXX0=