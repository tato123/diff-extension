"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inviteNewUserToWorkspace = exports.autoAcceptWorkspaceInvites = exports.createWorkspace = exports.pendingComments = exports.newComment = void 0;

var _mailgunJs = _interopRequireDefault(require("mailgun-js"));

var _logging = _interopRequireDefault(require("../../logging"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Mailgun configuration
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const from = 'Diff <diff-noreply@getdiff.app>';
const logoUrl = process.env.DIFF_LOGO;

const sendEmail = (to, subject, template) => {
  // We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  const mailgun = new _mailgunJs.default({
    apiKey,
    domain
  });
  const data = {
    from,
    to,
    subject,
    html: template
  };
  return new Promise((resolve, reject) => {
    // Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, (err, body) => {
      // If there is an error, render the error page
      if (err) {
        _logging.default.error('got an error: ', err);

        reject(new Error('got an error: ', err));
      } // Else we can greet    and leave
      else {
          // Here "submitted.jade" is the view file for this landing page
          // We pass the variable "email" from the url parameter in an object rendered by Jade
          _logging.default.debug(body);

          resolve(body);
        }
    });
  });
};

const newComment = (to, event) => sendEmail(to, '📑 A new comment was added', `
    <html style="background-color: #f9f9f9; height: 100%; width: 100%; margin: 0px; padding: 0px;">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      
    <style>body {
    margin: 0px; padding: 0px;
    }
    body {
    background-color: #f9f9f9; height: 100%; width: 100%;
    color: #000;
    }
    img {
    max-height: 50px; margin: 10px; top: 0px;
    }
    </style>
    </head>
    <body style="height: 100%; width: 100%; margin: 0px; padding: 0px;" bgcolor="#f9f9f9">
      <div>
      
    <div class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; padding: 10px 0;'>
      <div><img src="${logoUrl}" class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; max-height: 50px; top: 0px; margin: 10px; padding: 10px 0;'></div>
      <div class="content" style="border-radius: 4px; box-shadow: 0 0 3px 0px rgba(0,0,0,0.2); background-color: #fff; box-sizing: border-box; margin: 0 20px 20px; padding: 20px;">
        <p style="color: #000;">A new comment has been added:</p>
       
        <div style="margin-bottom: 16px; border: 1px solid #ccc;padding: 20px;color: #000;">${event.comment.trim()}</div>
       
      </div>
      <div class="footer" style="font-size: 12px;color: #000;" align="center">
          © 2018 getDiff, Inc. Built in NC.
            
      </div>
      </div>
      </div>
    </body>
    </html>
    
  `);

exports.newComment = newComment;

const pendingComments = (to, comments) => sendEmail(to, 'New comments digest', `
    <html style="background-color: #f9f9f9; height: 100%; width: 100%; margin: 0px; padding: 0px;">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      
    <style>body {
    margin: 0px; padding: 0px;
    }
    body {
    background-color: #f9f9f9; height: 100%; width: 100%;
    color: #000;
    }
    img {
    max-height: 50px; margin: 10px; top: 0px;
    }
    </style>
    </head>
    <body style="height: 100%; width: 100%; margin: 0px; padding: 0px;" bgcolor="#f9f9f9">
      <div>
      
    <div class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; padding: 10px 0;'>
      <div><img src="${logoUrl}" class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; max-height: 50px; top: 0px; margin: 10px; padding: 10px 0;'></div>
      <div class="content" style="border-radius: 4px; box-shadow: 0 0 3px 0px rgba(0,0,0,0.2); background-color: #fff; box-sizing: border-box; margin: 0 20px 20px; padding: 20px;">
        <p style="color: #000;">Here's a digest of all your unseen comments:</p>
        ${comments.map(comment => `<div style="margin-bottom: 16px; border: 1px solid #ccc;padding: 20px;color: #000;">${comment.comment.trim()}</div>`).join('')}        
      </div>
      <div class="footer" style="font-size: 12px;color: #000;" align="center">
          © 2018 getDiff, Inc. Built in NC.
            
      </div>
      </div>
      </div>
    </body>
    </html>
    
  `);

exports.pendingComments = pendingComments;

const createWorkspace = (to, name) => sendEmail(to, 'Welcome to Diff workspaces', `
    <html style="background-color: #f9f9f9; height: 100%; width: 100%; margin: 0px; padding: 0px;">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      
    <style>body {
    margin: 0px; padding: 0px;
    }
    body {
    background-color: #f9f9f9; height: 100%; width: 100%;
    }
    img {
    max-height: 50px; margin: 10px; top: 0px;
    }
    </style>
    </head>
    <body style="height: 100%; width: 100%; margin: 0px; padding: 0px;" bgcolor="#f9f9f9">
      <div>
      
    <div class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; padding: 10px 0;'>
      <div><img src="${logoUrl}" class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; max-height: 50px; top: 0px; margin: 10px; padding: 10px 0;'></div>
      <div class="content" style="border-radius: 4px; box-shadow: 0 0 3px 0px rgba(0,0,0,0.2); background-color: #fff; box-sizing: border-box; margin: 0 20px 20px; padding: 20px;">
        <label class="title" style="color: #dd387d; font-weight: 500; font-size: 1.6rem;">Hello!</label>
        <p>You just created a new workspace <span class="workspace" style="color: #dd387d; font-weight: bold;">(${name})</span> on diff. </p>
        <p>Check out all the great ways you can get started:</p>
        <div>
        <a class="primary" href="https://www.getdiff.app" style="background-color: #43cad9 !important; color: #fff; outline: none; text-align: center; display: block; border-radius: 8px; text-decoration: none; margin: 16px; padding: 20px;">Get Started</a>
        </div>
      </div>
      <div class="footer" style="font-size: 12px;" align="center">
          © 2018 getDiff, Inc. Built in NC.
            
      </div>
      </div>
      </div>
    </body>
    </html>
    
  `);

exports.createWorkspace = createWorkspace;

const autoAcceptWorkspaceInvites = (to, workspaceName) => sendEmail(to, 'Welcome to Diff workspaces', `
    <html style="background-color: #f9f9f9; height: 100%; width: 100%; margin: 0px; padding: 0px;">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      
    <style>body {
    margin: 0px; padding: 0px;
    }
    body {
    background-color: #f9f9f9; height: 100%; width: 100%;
    }
    img {
    max-height: 50px; margin: 10px; top: 0px;
    }
    </style>
    </head>
    <body style="height: 100%; width: 100%; margin: 0px; padding: 0px;" bgcolor="#f9f9f9">
      <div>
      
    <div class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; padding: 10px 0;'>
      <div><img src="${logoUrl}" class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; max-height: 50px; top: 0px; margin: 10px; padding: 10px 0;'></div>
      <div class="content" style="border-radius: 4px; box-shadow: 0 0 3px 0px rgba(0,0,0,0.2); background-color: #fff; box-sizing: border-box; margin: 0 20px 20px; padding: 20px;">
        <label class="title" style="color: #dd387d; font-weight: 500; font-size: 1.6rem;">Hello!</label>
        <p>You were added to the workspace <span class="workspace" style="color: #dd387d; font-weight: bold;">(${workspaceName})</span> on diff. </p>
        <p>Check out all the great ways you can get started:</p>
        <div>
        <a class="primary" href="https://www.getdiff.app" style="background-color: #43cad9 !important; color: #fff; outline: none; text-align: center; display: block; border-radius: 8px; text-decoration: none; margin: 16px; padding: 20px;">Get Started</a>
        </div>
      </div>
      <div class="footer" style="font-size: 12px;" align="center">
          © 2018 getDiff, Inc. Built in NC.
            
      </div>
      </div>
      </div>
    </body>
    </html>
    `);

exports.autoAcceptWorkspaceInvites = autoAcceptWorkspaceInvites;

const inviteNewUserToWorkspace = (to, workspaceName) => sendEmail(to, 'Welcome to Diff workspaces', `
    <html style="background-color: #f9f9f9; height: 100%; width: 100%; margin: 0px; padding: 0px;">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      
    <style>body {
    margin: 0px; padding: 0px;
    }
    body {
    background-color: #f9f9f9; height: 100%; width: 100%;
    }
    img {
    max-height: 50px; margin: 10px; top: 0px;
    }
    </style>
    </head>
    <body style="height: 100%; width: 100%; margin: 0px; padding: 0px;" bgcolor="#f9f9f9">
      <div>
      
    <div class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; padding: 10px 0;'>
      <div><img src="${logoUrl}" class="main" style='background-color: #f9f9f9; font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif; font-size: 1rem; max-height: 50px; top: 0px; margin: 10px; padding: 10px 0;'></div>
      <div class="content" style="border-radius: 4px; box-shadow: 0 0 3px 0px rgba(0,0,0,0.2); background-color: #fff; box-sizing: border-box; margin: 0 20px 20px; padding: 20px;">
        <label class="title" style="color: #dd387d; font-weight: 500; font-size: 1.6rem;">Hello!</label>
        <p>You were invited to the workspace <span class="workspace" style="color: #dd387d; font-weight: bold;">(${workspaceName})</span> on diff. </p>
        <p>Check out all the great ways you can get started:</p>
        <div>
        <a class="primary" href="https://www.getdiff.app" style="background-color: #43cad9 !important; color: #fff; outline: none; text-align: center; display: block; border-radius: 8px; text-decoration: none; margin: 16px; padding: 20px;">Get Started</a>
        </div>
      </div>
      <div class="footer" style="font-size: 12px;" align="center">
          © 2018 getDiff, Inc. Built in NC.
            
      </div>
      </div>
      </div>
    </body>
    </html>
    `);

exports.inviteNewUserToWorkspace = inviteNewUserToWorkspace;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvaGVscGVycy9lbWFpbC5qcyJdLCJuYW1lcyI6WyJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiTUFJTEdVTl9BUElfS0VZIiwiZG9tYWluIiwiTUFJTEdVTl9ET01BSU4iLCJmcm9tIiwibG9nb1VybCIsIkRJRkZfTE9HTyIsInNlbmRFbWFpbCIsInRvIiwic3ViamVjdCIsInRlbXBsYXRlIiwibWFpbGd1biIsIk1haWxndW4iLCJkYXRhIiwiaHRtbCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWVzc2FnZXMiLCJzZW5kIiwiZXJyIiwiYm9keSIsImxvZ2dpbmciLCJlcnJvciIsIkVycm9yIiwiZGVidWciLCJuZXdDb21tZW50IiwiZXZlbnQiLCJjb21tZW50IiwidHJpbSIsInBlbmRpbmdDb21tZW50cyIsImNvbW1lbnRzIiwibWFwIiwiam9pbiIsImNyZWF0ZVdvcmtzcGFjZSIsIm5hbWUiLCJhdXRvQWNjZXB0V29ya3NwYWNlSW52aXRlcyIsIndvcmtzcGFjZU5hbWUiLCJpbnZpdGVOZXdVc2VyVG9Xb3Jrc3BhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBO0FBQ0EsTUFBTUEsTUFBTSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsZUFBM0I7QUFDQSxNQUFNQyxNQUFNLEdBQUdILE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxjQUEzQjtBQUNBLE1BQU1DLElBQUksR0FBRyxpQ0FBYjtBQUVBLE1BQU1DLE9BQU8sR0FBR04sT0FBTyxDQUFDQyxHQUFSLENBQVlNLFNBQTVCOztBQUVBLE1BQU1DLFNBQVMsR0FBRyxDQUFDQyxFQUFELEVBQUtDLE9BQUwsRUFBY0MsUUFBZCxLQUEyQjtBQUMzQztBQUNBLFFBQU1DLE9BQU8sR0FBRyxJQUFJQyxrQkFBSixDQUFZO0FBQUVkLElBQUFBLE1BQUY7QUFBVUksSUFBQUE7QUFBVixHQUFaLENBQWhCO0FBRUEsUUFBTVcsSUFBSSxHQUFHO0FBQ1hULElBQUFBLElBRFc7QUFFWEksSUFBQUEsRUFGVztBQUdYQyxJQUFBQSxPQUhXO0FBSVhLLElBQUFBLElBQUksRUFBRUo7QUFKSyxHQUFiO0FBT0EsU0FBTyxJQUFJSyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDO0FBQ0FOLElBQUFBLE9BQU8sQ0FBQ08sUUFBUixHQUFtQkMsSUFBbkIsQ0FBd0JOLElBQXhCLEVBQThCLENBQUNPLEdBQUQsRUFBTUMsSUFBTixLQUFlO0FBQzNDO0FBQ0EsVUFBSUQsR0FBSixFQUFTO0FBQ1BFLHlCQUFRQyxLQUFSLENBQWMsZ0JBQWQsRUFBZ0NILEdBQWhDOztBQUNBSCxRQUFBQSxNQUFNLENBQUMsSUFBSU8sS0FBSixDQUFVLGdCQUFWLEVBQTRCSixHQUE1QixDQUFELENBQU47QUFDRCxPQUhELENBSUE7QUFKQSxXQUtLO0FBQ0g7QUFDQTtBQUNBRSwyQkFBUUcsS0FBUixDQUFjSixJQUFkOztBQUNBTCxVQUFBQSxPQUFPLENBQUNLLElBQUQsQ0FBUDtBQUNEO0FBQ0YsS0FiRDtBQWNELEdBaEJNLENBQVA7QUFpQkQsQ0E1QkQ7O0FBOEJPLE1BQU1LLFVBQVUsR0FBRyxDQUFDbEIsRUFBRCxFQUFLbUIsS0FBTCxLQUN4QnBCLFNBQVMsQ0FDUEMsRUFETyxFQUVQLDRCQUZPLEVBR047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQXVCa0JILE9BQVE7Ozs7OEZBSStEc0IsS0FBSyxDQUFDQyxPQUFOLENBQWNDLElBQWQsRUFBcUI7Ozs7Ozs7Ozs7OztHQTlCeEcsQ0FESjs7OztBQThDQSxNQUFNQyxlQUFlLEdBQUcsQ0FBQ3RCLEVBQUQsRUFBS3VCLFFBQUwsS0FDN0J4QixTQUFTLENBQ1BDLEVBRE8sRUFFUCxxQkFGTyxFQUdOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkF1QmtCSCxPQUFROzs7VUFHckIwQixRQUFRLENBQ1BDLEdBREQsQ0FFRUosT0FBTyxJQUNKLHVGQUFzRkEsT0FBTyxDQUFDQSxPQUFSLENBQWdCQyxJQUFoQixFQUF1QixRQUhsSCxFQUtDSSxJQUxELENBS00sRUFMTixDQUtVOzs7Ozs7Ozs7OztHQWxDVCxDQURKOzs7O0FBaURBLE1BQU1DLGVBQWUsR0FBRyxDQUFDMUIsRUFBRCxFQUFLMkIsSUFBTCxLQUM3QjVCLFNBQVMsQ0FDUEMsRUFETyxFQUVQLDRCQUZPLEVBR047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBc0JrQkgsT0FBUTs7O2tIQUdtRjhCLElBQUs7Ozs7Ozs7Ozs7Ozs7OztHQTVCNUcsQ0FESjs7OztBQStDQSxNQUFNQywwQkFBMEIsR0FBRyxDQUFDNUIsRUFBRCxFQUFLNkIsYUFBTCxLQUN4QzlCLFNBQVMsQ0FDUEMsRUFETyxFQUVQLDRCQUZPLEVBR047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBc0JrQkgsT0FBUTs7O2lIQUdrRmdDLGFBQWM7Ozs7Ozs7Ozs7Ozs7O0tBNUJwSCxDQURKOzs7O0FBOENBLE1BQU1DLHdCQUF3QixHQUFHLENBQUM5QixFQUFELEVBQUs2QixhQUFMLEtBQ3RDOUIsU0FBUyxDQUNQQyxFQURPLEVBRVAsNEJBRk8sRUFHTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1QkFzQmtCSCxPQUFROzs7bUhBR29GZ0MsYUFBYzs7Ozs7Ozs7Ozs7Ozs7S0E1QnRILENBREoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWFpbGd1biBmcm9tICdtYWlsZ3VuLWpzJztcbmltcG9ydCBsb2dnaW5nIGZyb20gJy4uLy4uL2xvZ2dpbmcnO1xuXG4vLyBNYWlsZ3VuIGNvbmZpZ3VyYXRpb25cbmNvbnN0IGFwaUtleSA9IHByb2Nlc3MuZW52Lk1BSUxHVU5fQVBJX0tFWTtcbmNvbnN0IGRvbWFpbiA9IHByb2Nlc3MuZW52Lk1BSUxHVU5fRE9NQUlOO1xuY29uc3QgZnJvbSA9ICdEaWZmIDxkaWZmLW5vcmVwbHlAZ2V0ZGlmZi5hcHA+JztcblxuY29uc3QgbG9nb1VybCA9IHByb2Nlc3MuZW52LkRJRkZfTE9HTztcblxuY29uc3Qgc2VuZEVtYWlsID0gKHRvLCBzdWJqZWN0LCB0ZW1wbGF0ZSkgPT4ge1xuICAvLyBXZSBwYXNzIHRoZSBhcGlfa2V5IGFuZCBkb21haW4gdG8gdGhlIHdyYXBwZXIsIG9yIGl0IHdvbid0IGJlIGFibGUgdG8gaWRlbnRpZnkgKyBzZW5kIGVtYWlsc1xuICBjb25zdCBtYWlsZ3VuID0gbmV3IE1haWxndW4oeyBhcGlLZXksIGRvbWFpbiB9KTtcblxuICBjb25zdCBkYXRhID0ge1xuICAgIGZyb20sXG4gICAgdG8sXG4gICAgc3ViamVjdCxcbiAgICBodG1sOiB0ZW1wbGF0ZVxuICB9O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gSW52b2tlcyB0aGUgbWV0aG9kIHRvIHNlbmQgZW1haWxzIGdpdmVuIHRoZSBhYm92ZSBkYXRhIHdpdGggdGhlIGhlbHBlciBsaWJyYXJ5XG4gICAgbWFpbGd1bi5tZXNzYWdlcygpLnNlbmQoZGF0YSwgKGVyciwgYm9keSkgPT4ge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IsIHJlbmRlciB0aGUgZXJyb3IgcGFnZVxuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnaW5nLmVycm9yKCdnb3QgYW4gZXJyb3I6ICcsIGVycik7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2dvdCBhbiBlcnJvcjogJywgZXJyKSk7XG4gICAgICB9XG4gICAgICAvLyBFbHNlIHdlIGNhbiBncmVldCAgICBhbmQgbGVhdmVcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBIZXJlIFwic3VibWl0dGVkLmphZGVcIiBpcyB0aGUgdmlldyBmaWxlIGZvciB0aGlzIGxhbmRpbmcgcGFnZVxuICAgICAgICAvLyBXZSBwYXNzIHRoZSB2YXJpYWJsZSBcImVtYWlsXCIgZnJvbSB0aGUgdXJsIHBhcmFtZXRlciBpbiBhbiBvYmplY3QgcmVuZGVyZWQgYnkgSmFkZVxuICAgICAgICBsb2dnaW5nLmRlYnVnKGJvZHkpO1xuICAgICAgICByZXNvbHZlKGJvZHkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBuZXdDb21tZW50ID0gKHRvLCBldmVudCkgPT5cbiAgc2VuZEVtYWlsKFxuICAgIHRvLFxuICAgICfwn5ORIEEgbmV3IGNvbW1lbnQgd2FzIGFkZGVkJyxcbiAgICBgXG4gICAgPGh0bWwgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4O1wiPlxuICAgIDxoZWFkPlxuICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCI+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cbiAgICAgIDxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGhcIj5cbiAgICAgIFxuICAgIDxzdHlsZT5ib2R5IHtcbiAgICBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4O1xuICAgIH1cbiAgICBib2R5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlO1xuICAgIGNvbG9yOiAjMDAwO1xuICAgIH1cbiAgICBpbWcge1xuICAgIG1heC1oZWlnaHQ6IDUwcHg7IG1hcmdpbjogMTBweDsgdG9wOiAwcHg7XG4gICAgfVxuICAgIDwvc3R5bGU+XG4gICAgPC9oZWFkPlxuICAgIDxib2R5IHN0eWxlPVwiaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweDtcIiBiZ2NvbG9yPVwiI2Y5ZjlmOVwiPlxuICAgICAgPGRpdj5cbiAgICAgIFxuICAgIDxkaXYgY2xhc3M9XCJtYWluXCIgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJXCIsUm9ib3RvLE94eWdlbi1TYW5zLFVidW50dSxDYW50YXJlbGwsXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMXJlbTsgcGFkZGluZzogMTBweCAwOyc+XG4gICAgICA8ZGl2PjxpbWcgc3JjPVwiJHtsb2dvVXJsfVwiIGNsYXNzPVwibWFpblwiIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmOyBmb250LXNpemU6IDFyZW07IG1heC1oZWlnaHQ6IDUwcHg7IHRvcDogMHB4OyBtYXJnaW46IDEwcHg7IHBhZGRpbmc6IDEwcHggMDsnPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIiBzdHlsZT1cImJvcmRlci1yYWRpdXM6IDRweDsgYm94LXNoYWRvdzogMCAwIDNweCAwcHggcmdiYSgwLDAsMCwwLjIpOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBtYXJnaW46IDAgMjBweCAyMHB4OyBwYWRkaW5nOiAyMHB4O1wiPlxuICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjMDAwO1wiPkEgbmV3IGNvbW1lbnQgaGFzIGJlZW4gYWRkZWQ6PC9wPlxuICAgICAgIFxuICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTZweDsgYm9yZGVyOiAxcHggc29saWQgI2NjYztwYWRkaW5nOiAyMHB4O2NvbG9yOiAjMDAwO1wiPiR7ZXZlbnQuY29tbWVudC50cmltKCl9PC9kaXY+XG4gICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJmb290ZXJcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTJweDtjb2xvcjogIzAwMDtcIiBhbGlnbj1cImNlbnRlclwiPlxuICAgICAgICAgIMKpIDIwMTggZ2V0RGlmZiwgSW5jLiBCdWlsdCBpbiBOQy5cbiAgICAgICAgICAgIFxuICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gICAgXG4gIGBcbiAgKTtcblxuZXhwb3J0IGNvbnN0IHBlbmRpbmdDb21tZW50cyA9ICh0bywgY29tbWVudHMpID0+XG4gIHNlbmRFbWFpbChcbiAgICB0byxcbiAgICAnTmV3IGNvbW1lbnRzIGRpZ2VzdCcsXG4gICAgYFxuICAgIDxodG1sIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweDtcIj5cbiAgICA8aGVhZD5cbiAgICA8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD11dGYtOFwiPlxuICAgICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XG4gICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoXCI+XG4gICAgICBcbiAgICA8c3R5bGU+Ym9keSB7XG4gICAgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweDtcbiAgICB9XG4gICAgYm9keSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTtcbiAgICBjb2xvcjogIzAwMDtcbiAgICB9XG4gICAgaW1nIHtcbiAgICBtYXgtaGVpZ2h0OiA1MHB4OyBtYXJnaW46IDEwcHg7IHRvcDogMHB4O1xuICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDwvaGVhZD5cbiAgICA8Ym9keSBzdHlsZT1cImhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7XCIgYmdjb2xvcj1cIiNmOWY5ZjlcIj5cbiAgICAgIDxkaXY+XG4gICAgICBcbiAgICA8ZGl2IGNsYXNzPVwibWFpblwiIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmOyBmb250LXNpemU6IDFyZW07IHBhZGRpbmc6IDEwcHggMDsnPlxuICAgICAgPGRpdj48aW1nIHNyYz1cIiR7bG9nb1VybH1cIiBjbGFzcz1cIm1haW5cIiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sT3h5Z2VuLVNhbnMsVWJ1bnR1LENhbnRhcmVsbCxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxcmVtOyBtYXgtaGVpZ2h0OiA1MHB4OyB0b3A6IDBweDsgbWFyZ2luOiAxMHB4OyBwYWRkaW5nOiAxMHB4IDA7Jz48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiA0cHg7IGJveC1zaGFkb3c6IDAgMCAzcHggMHB4IHJnYmEoMCwwLDAsMC4yKTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgYm94LXNpemluZzogYm9yZGVyLWJveDsgbWFyZ2luOiAwIDIwcHggMjBweDsgcGFkZGluZzogMjBweDtcIj5cbiAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzAwMDtcIj5IZXJlJ3MgYSBkaWdlc3Qgb2YgYWxsIHlvdXIgdW5zZWVuIGNvbW1lbnRzOjwvcD5cbiAgICAgICAgJHtjb21tZW50c1xuICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICBjb21tZW50ID0+XG4gICAgICAgICAgICAgIGA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTZweDsgYm9yZGVyOiAxcHggc29saWQgI2NjYztwYWRkaW5nOiAyMHB4O2NvbG9yOiAjMDAwO1wiPiR7Y29tbWVudC5jb21tZW50LnRyaW0oKX08L2Rpdj5gXG4gICAgICAgICAgKVxuICAgICAgICAgIC5qb2luKCcnKX0gICAgICAgIFxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCIgc3R5bGU9XCJmb250LXNpemU6IDEycHg7Y29sb3I6ICMwMDA7XCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICDCqSAyMDE4IGdldERpZmYsIEluYy4gQnVpbHQgaW4gTkMuXG4gICAgICAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICAgIFxuICBgXG4gICk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVXb3Jrc3BhY2UgPSAodG8sIG5hbWUpID0+XG4gIHNlbmRFbWFpbChcbiAgICB0byxcbiAgICAnV2VsY29tZSB0byBEaWZmIHdvcmtzcGFjZXMnLFxuICAgIGBcbiAgICA8aHRtbCBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7XCI+XG4gICAgPGhlYWQ+XG4gICAgPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLThcIj5cbiAgICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aFwiPlxuICAgICAgXG4gICAgPHN0eWxlPmJvZHkge1xuICAgIG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7XG4gICAgfVxuICAgIGJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIGltZyB7XG4gICAgbWF4LWhlaWdodDogNTBweDsgbWFyZ2luOiAxMHB4OyB0b3A6IDBweDtcbiAgICB9XG4gICAgPC9zdHlsZT5cbiAgICA8L2hlYWQ+XG4gICAgPGJvZHkgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4O1wiIGJnY29sb3I9XCIjZjlmOWY5XCI+XG4gICAgICA8ZGl2PlxuICAgICAgXG4gICAgPGRpdiBjbGFzcz1cIm1haW5cIiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sT3h5Z2VuLVNhbnMsVWJ1bnR1LENhbnRhcmVsbCxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxcmVtOyBwYWRkaW5nOiAxMHB4IDA7Jz5cbiAgICAgIDxkaXY+PGltZyBzcmM9XCIke2xvZ29Vcmx9XCIgY2xhc3M9XCJtYWluXCIgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJXCIsUm9ib3RvLE94eWdlbi1TYW5zLFVidW50dSxDYW50YXJlbGwsXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMXJlbTsgbWF4LWhlaWdodDogNTBweDsgdG9wOiAwcHg7IG1hcmdpbjogMTBweDsgcGFkZGluZzogMTBweCAwOyc+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogNHB4OyBib3gtc2hhZG93OiAwIDAgM3B4IDBweCByZ2JhKDAsMCwwLDAuMik7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IG1hcmdpbjogMCAyMHB4IDIwcHg7IHBhZGRpbmc6IDIwcHg7XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInRpdGxlXCIgc3R5bGU9XCJjb2xvcjogI2RkMzg3ZDsgZm9udC13ZWlnaHQ6IDUwMDsgZm9udC1zaXplOiAxLjZyZW07XCI+SGVsbG8hPC9sYWJlbD5cbiAgICAgICAgPHA+WW91IGp1c3QgY3JlYXRlZCBhIG5ldyB3b3Jrc3BhY2UgPHNwYW4gY2xhc3M9XCJ3b3Jrc3BhY2VcIiBzdHlsZT1cImNvbG9yOiAjZGQzODdkOyBmb250LXdlaWdodDogYm9sZDtcIj4oJHtuYW1lfSk8L3NwYW4+IG9uIGRpZmYuIDwvcD5cbiAgICAgICAgPHA+Q2hlY2sgb3V0IGFsbCB0aGUgZ3JlYXQgd2F5cyB5b3UgY2FuIGdldCBzdGFydGVkOjwvcD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJwcmltYXJ5XCIgaHJlZj1cImh0dHBzOi8vd3d3LmdldGRpZmYuYXBwXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjNDNjYWQ5ICFpbXBvcnRhbnQ7IGNvbG9yOiAjZmZmOyBvdXRsaW5lOiBub25lOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGRpc3BsYXk6IGJsb2NrOyBib3JkZXItcmFkaXVzOiA4cHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgbWFyZ2luOiAxNnB4OyBwYWRkaW5nOiAyMHB4O1wiPkdldCBTdGFydGVkPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZvb3RlclwiIHN0eWxlPVwiZm9udC1zaXplOiAxMnB4O1wiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgwqkgMjAxOCBnZXREaWZmLCBJbmMuIEJ1aWx0IGluIE5DLlxuICAgICAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgICBcbiAgYFxuICApO1xuXG5leHBvcnQgY29uc3QgYXV0b0FjY2VwdFdvcmtzcGFjZUludml0ZXMgPSAodG8sIHdvcmtzcGFjZU5hbWUpID0+XG4gIHNlbmRFbWFpbChcbiAgICB0byxcbiAgICAnV2VsY29tZSB0byBEaWZmIHdvcmtzcGFjZXMnLFxuICAgIGBcbiAgICA8aHRtbCBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7XCI+XG4gICAgPGhlYWQ+XG4gICAgPG1ldGEgaHR0cC1lcXVpdj1cIkNvbnRlbnQtVHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLThcIj5cbiAgICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aFwiPlxuICAgICAgXG4gICAgPHN0eWxlPmJvZHkge1xuICAgIG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7XG4gICAgfVxuICAgIGJvZHkge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7XG4gICAgfVxuICAgIGltZyB7XG4gICAgbWF4LWhlaWdodDogNTBweDsgbWFyZ2luOiAxMHB4OyB0b3A6IDBweDtcbiAgICB9XG4gICAgPC9zdHlsZT5cbiAgICA8L2hlYWQ+XG4gICAgPGJvZHkgc3R5bGU9XCJoZWlnaHQ6IDEwMCU7IHdpZHRoOiAxMDAlOyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4O1wiIGJnY29sb3I9XCIjZjlmOWY5XCI+XG4gICAgICA8ZGl2PlxuICAgICAgXG4gICAgPGRpdiBjbGFzcz1cIm1haW5cIiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sT3h5Z2VuLVNhbnMsVWJ1bnR1LENhbnRhcmVsbCxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxcmVtOyBwYWRkaW5nOiAxMHB4IDA7Jz5cbiAgICAgIDxkaXY+PGltZyBzcmM9XCIke2xvZ29Vcmx9XCIgY2xhc3M9XCJtYWluXCIgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7IGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJXCIsUm9ib3RvLE94eWdlbi1TYW5zLFVidW50dSxDYW50YXJlbGwsXCJIZWx2ZXRpY2EgTmV1ZVwiLHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMXJlbTsgbWF4LWhlaWdodDogNTBweDsgdG9wOiAwcHg7IG1hcmdpbjogMTBweDsgcGFkZGluZzogMTBweCAwOyc+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogNHB4OyBib3gtc2hhZG93OiAwIDAgM3B4IDBweCByZ2JhKDAsMCwwLDAuMik7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IG1hcmdpbjogMCAyMHB4IDIwcHg7IHBhZGRpbmc6IDIwcHg7XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cInRpdGxlXCIgc3R5bGU9XCJjb2xvcjogI2RkMzg3ZDsgZm9udC13ZWlnaHQ6IDUwMDsgZm9udC1zaXplOiAxLjZyZW07XCI+SGVsbG8hPC9sYWJlbD5cbiAgICAgICAgPHA+WW91IHdlcmUgYWRkZWQgdG8gdGhlIHdvcmtzcGFjZSA8c3BhbiBjbGFzcz1cIndvcmtzcGFjZVwiIHN0eWxlPVwiY29sb3I6ICNkZDM4N2Q7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPigke3dvcmtzcGFjZU5hbWV9KTwvc3Bhbj4gb24gZGlmZi4gPC9wPlxuICAgICAgICA8cD5DaGVjayBvdXQgYWxsIHRoZSBncmVhdCB3YXlzIHlvdSBjYW4gZ2V0IHN0YXJ0ZWQ6PC9wPlxuICAgICAgICA8ZGl2PlxuICAgICAgICA8YSBjbGFzcz1cInByaW1hcnlcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ2V0ZGlmZi5hcHBcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICM0M2NhZDkgIWltcG9ydGFudDsgY29sb3I6ICNmZmY7IG91dGxpbmU6IG5vbmU7IHRleHQtYWxpZ246IGNlbnRlcjsgZGlzcGxheTogYmxvY2s7IGJvcmRlci1yYWRpdXM6IDhweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBtYXJnaW46IDE2cHg7IHBhZGRpbmc6IDIwcHg7XCI+R2V0IFN0YXJ0ZWQ8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCIgc3R5bGU9XCJmb250LXNpemU6IDEycHg7XCIgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICDCqSAyMDE4IGdldERpZmYsIEluYy4gQnVpbHQgaW4gTkMuXG4gICAgICAgICAgICBcbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2JvZHk+XG4gICAgPC9odG1sPlxuICAgIGBcbiAgKTtcblxuZXhwb3J0IGNvbnN0IGludml0ZU5ld1VzZXJUb1dvcmtzcGFjZSA9ICh0bywgd29ya3NwYWNlTmFtZSkgPT5cbiAgc2VuZEVtYWlsKFxuICAgIHRvLFxuICAgICdXZWxjb21lIHRvIERpZmYgd29ya3NwYWNlcycsXG4gICAgYFxuICAgIDxodG1sIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweDtcIj5cbiAgICA8aGVhZD5cbiAgICA8bWV0YSBodHRwLWVxdWl2PVwiQ29udGVudC1UeXBlXCIgY29udGVudD1cInRleHQvaHRtbDsgY2hhcnNldD11dGYtOFwiPlxuICAgICAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XG4gICAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoXCI+XG4gICAgICBcbiAgICA8c3R5bGU+Ym9keSB7XG4gICAgbWFyZ2luOiAwcHg7IHBhZGRpbmc6IDBweDtcbiAgICB9XG4gICAgYm9keSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTtcbiAgICB9XG4gICAgaW1nIHtcbiAgICBtYXgtaGVpZ2h0OiA1MHB4OyBtYXJnaW46IDEwcHg7IHRvcDogMHB4O1xuICAgIH1cbiAgICA8L3N0eWxlPlxuICAgIDwvaGVhZD5cbiAgICA8Ym9keSBzdHlsZT1cImhlaWdodDogMTAwJTsgd2lkdGg6IDEwMCU7IG1hcmdpbjogMHB4OyBwYWRkaW5nOiAwcHg7XCIgYmdjb2xvcj1cIiNmOWY5ZjlcIj5cbiAgICAgIDxkaXY+XG4gICAgICBcbiAgICA8ZGl2IGNsYXNzPVwibWFpblwiIHN0eWxlPSdiYWNrZ3JvdW5kLWNvbG9yOiAjZjlmOWY5OyBmb250LWZhbWlseTogLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLFwiSGVsdmV0aWNhIE5ldWVcIixzYW5zLXNlcmlmOyBmb250LXNpemU6IDFyZW07IHBhZGRpbmc6IDEwcHggMDsnPlxuICAgICAgPGRpdj48aW1nIHNyYz1cIiR7bG9nb1VybH1cIiBjbGFzcz1cIm1haW5cIiBzdHlsZT0nYmFja2dyb3VuZC1jb2xvcjogI2Y5ZjlmOTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUlcIixSb2JvdG8sT3h5Z2VuLVNhbnMsVWJ1bnR1LENhbnRhcmVsbCxcIkhlbHZldGljYSBOZXVlXCIsc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxcmVtOyBtYXgtaGVpZ2h0OiA1MHB4OyB0b3A6IDBweDsgbWFyZ2luOiAxMHB4OyBwYWRkaW5nOiAxMHB4IDA7Jz48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCIgc3R5bGU9XCJib3JkZXItcmFkaXVzOiA0cHg7IGJveC1zaGFkb3c6IDAgMCAzcHggMHB4IHJnYmEoMCwwLDAsMC4yKTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgYm94LXNpemluZzogYm9yZGVyLWJveDsgbWFyZ2luOiAwIDIwcHggMjBweDsgcGFkZGluZzogMjBweDtcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwidGl0bGVcIiBzdHlsZT1cImNvbG9yOiAjZGQzODdkOyBmb250LXdlaWdodDogNTAwOyBmb250LXNpemU6IDEuNnJlbTtcIj5IZWxsbyE8L2xhYmVsPlxuICAgICAgICA8cD5Zb3Ugd2VyZSBpbnZpdGVkIHRvIHRoZSB3b3Jrc3BhY2UgPHNwYW4gY2xhc3M9XCJ3b3Jrc3BhY2VcIiBzdHlsZT1cImNvbG9yOiAjZGQzODdkOyBmb250LXdlaWdodDogYm9sZDtcIj4oJHt3b3Jrc3BhY2VOYW1lfSk8L3NwYW4+IG9uIGRpZmYuIDwvcD5cbiAgICAgICAgPHA+Q2hlY2sgb3V0IGFsbCB0aGUgZ3JlYXQgd2F5cyB5b3UgY2FuIGdldCBzdGFydGVkOjwvcD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgPGEgY2xhc3M9XCJwcmltYXJ5XCIgaHJlZj1cImh0dHBzOi8vd3d3LmdldGRpZmYuYXBwXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjNDNjYWQ5ICFpbXBvcnRhbnQ7IGNvbG9yOiAjZmZmOyBvdXRsaW5lOiBub25lOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGRpc3BsYXk6IGJsb2NrOyBib3JkZXItcmFkaXVzOiA4cHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgbWFyZ2luOiAxNnB4OyBwYWRkaW5nOiAyMHB4O1wiPkdldCBTdGFydGVkPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImZvb3RlclwiIHN0eWxlPVwiZm9udC1zaXplOiAxMnB4O1wiIGFsaWduPVwiY2VudGVyXCI+XG4gICAgICAgICAgwqkgMjAxOCBnZXREaWZmLCBJbmMuIEJ1aWx0IGluIE5DLlxuICAgICAgICAgICAgXG4gICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgICBgXG4gICk7XG4iXX0=