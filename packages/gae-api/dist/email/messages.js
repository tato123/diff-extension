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

const welcomeEmail = ({
  from = defaultFrom,
  to
}) => {
  const mail = {
    from,
    to,
    subject: 'Welcome',
    template: 'welcome'
  };
  return _transporter.default.sendMail(mail);
};

var _default = {
  signupEmail,
  welcomeEmail
};
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbWFpbC9tZXNzYWdlcy5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0RnJvbSIsInNpZ251cEVtYWlsIiwiZnJvbSIsInRvIiwibmFtZSIsIm1haWwiLCJzdWJqZWN0IiwidGVtcGxhdGUiLCJjb250ZXh0IiwidGl0bGUiLCJ0cmFuc3BvcnRlciIsInNlbmRNYWlsIiwid2VsY29tZUVtYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFFQSxNQUFNQSxXQUFXLEdBQUcsaUNBQXBCOztBQUVBLE1BQU1DLFdBQVcsR0FBRyxDQUFDO0FBQUVDLEVBQUFBLElBQUksR0FBR0YsV0FBVDtBQUFzQkcsRUFBQUEsRUFBdEI7QUFBMEJDLEVBQUFBO0FBQTFCLENBQUQsS0FBc0M7QUFDeEQsUUFBTUMsSUFBSSxHQUFHO0FBQ1hILElBQUFBLElBRFc7QUFFWEMsSUFBQUEsRUFGVztBQUdYRyxJQUFBQSxPQUFPLEVBQUUsYUFIRTtBQUlYQyxJQUFBQSxRQUFRLEVBQUUsYUFKQztBQUtYQyxJQUFBQSxPQUFPLEVBQUU7QUFDUEMsTUFBQUEsS0FBSyxFQUFHLHdDQUF1Q0wsSUFBSztBQUQ3QztBQUxFLEdBQWI7QUFTQSxTQUFPTSxxQkFBWUMsUUFBWixDQUFxQk4sSUFBckIsQ0FBUDtBQUNELENBWEQ7O0FBYUEsTUFBTU8sWUFBWSxHQUFHLENBQUM7QUFBRVYsRUFBQUEsSUFBSSxHQUFHRixXQUFUO0FBQXNCRyxFQUFBQTtBQUF0QixDQUFELEtBQWdDO0FBQ25ELFFBQU1FLElBQUksR0FBRztBQUNYSCxJQUFBQSxJQURXO0FBRVhDLElBQUFBLEVBRlc7QUFHWEcsSUFBQUEsT0FBTyxFQUFFLFNBSEU7QUFJWEMsSUFBQUEsUUFBUSxFQUFFO0FBSkMsR0FBYjtBQU1BLFNBQU9HLHFCQUFZQyxRQUFaLENBQXFCTixJQUFyQixDQUFQO0FBQ0QsQ0FSRDs7ZUFVZTtBQUNiSixFQUFBQSxXQURhO0FBRWJXLEVBQUFBO0FBRmEsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0cmFuc3BvcnRlciBmcm9tICcuL3RyYW5zcG9ydGVyJztcblxuY29uc3QgZGVmYXVsdEZyb20gPSAnRGlmZiA8ZGlmZi1ub3JlcGx5QGdldGRpZmYuYXBwPic7XG5cbmNvbnN0IHNpZ251cEVtYWlsID0gKHsgZnJvbSA9IGRlZmF1bHRGcm9tLCB0bywgbmFtZSB9KSA9PiB7XG4gIGNvbnN0IG1haWwgPSB7XG4gICAgZnJvbSxcbiAgICB0byxcbiAgICBzdWJqZWN0OiAnQmV0YSBTaWdudXAnLFxuICAgIHRlbXBsYXRlOiAnZWFybHlTaWdudXAnLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIHRpdGxlOiBgWW91J3JlIHNpZ25lZCB1cCBmb3IgdGhlIGVhcmx5IGJldGEsICR7bmFtZX1gXG4gICAgfVxuICB9O1xuICByZXR1cm4gdHJhbnNwb3J0ZXIuc2VuZE1haWwobWFpbCk7XG59O1xuXG5jb25zdCB3ZWxjb21lRW1haWwgPSAoeyBmcm9tID0gZGVmYXVsdEZyb20sIHRvIH0pID0+IHtcbiAgY29uc3QgbWFpbCA9IHtcbiAgICBmcm9tLFxuICAgIHRvLFxuICAgIHN1YmplY3Q6ICdXZWxjb21lJyxcbiAgICB0ZW1wbGF0ZTogJ3dlbGNvbWUnXG4gIH07XG4gIHJldHVybiB0cmFuc3BvcnRlci5zZW5kTWFpbChtYWlsKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2lnbnVwRW1haWwsXG4gIHdlbGNvbWVFbWFpbFxufTtcbiJdfQ==