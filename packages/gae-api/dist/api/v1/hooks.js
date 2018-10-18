"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth0PostUser = void 0;

const auth0PostUser = (req, res) => {
  const {
    body: {
      user
    }
  } = req;
  console.log('AUTH0 hook created with user', user);
  res.send(201);
};

exports.auth0PostUser = auth0PostUser;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvdjEvaG9va3MuanMiXSwibmFtZXMiOlsiYXV0aDBQb3N0VXNlciIsInJlcSIsInJlcyIsImJvZHkiLCJ1c2VyIiwiY29uc29sZSIsImxvZyIsInNlbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxNQUFNQSxhQUFhLEdBQUcsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDekMsUUFBTTtBQUNKQyxJQUFBQSxJQUFJLEVBQUU7QUFBRUMsTUFBQUE7QUFBRjtBQURGLE1BRUZILEdBRko7QUFJQUksRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksOEJBQVosRUFBNENGLElBQTVDO0FBRUFGLEVBQUFBLEdBQUcsQ0FBQ0ssSUFBSixDQUFTLEdBQVQ7QUFDRCxDQVJNIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGF1dGgwUG9zdFVzZXIgPSAocmVxLCByZXMpID0+IHtcbiAgY29uc3Qge1xuICAgIGJvZHk6IHsgdXNlciB9XG4gIH0gPSByZXE7XG5cbiAgY29uc29sZS5sb2coJ0FVVEgwIGhvb2sgY3JlYXRlZCB3aXRoIHVzZXInLCB1c2VyKTtcblxuICByZXMuc2VuZCgyMDEpO1xufTtcbiJdfQ==