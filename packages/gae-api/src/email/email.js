import Mailgun from 'mailgun-js';
import logging from '../logging';

// Mailgun configuration
const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const from = 'Diff <diff-noreply@getdiff.app>';

const logoUrl = process.env.DIFF_LOGO;

const sendEmail = (to, subject, template) => {
  // We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  const mailgun = new Mailgun({ apiKey, domain });

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
        logging.error('got an error: ', err);
        reject(new Error('got an error: ', err));
      }
      // Else we can greet    and leave
      else {
        // Here "submitted.jade" is the view file for this landing page
        // We pass the variable "email" from the url parameter in an object rendered by Jade
        logging.debug(body);
        resolve(body);
      }
    });
  });
};

export const newComment = (to, event) =>
  sendEmail(
    to,
    '📑 A new comment was added',
    `
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
    
  `
  );

export const pendingComments = (to, comments) =>
  sendEmail(
    to,
    'New comments digest',
    `
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
        ${comments
          .map(
            comment =>
              `<div style="margin-bottom: 16px; border: 1px solid #ccc;padding: 20px;color: #000;">${comment.comment.trim()}</div>`
          )
          .join('')}        
      </div>
      <div class="footer" style="font-size: 12px;color: #000;" align="center">
          © 2018 getDiff, Inc. Built in NC.
            
      </div>
      </div>
      </div>
    </body>
    </html>
    
  `
  );

export const createWorkspace = (to, name) =>
  sendEmail(
    to,
    'Welcome to Diff workspaces',
    `
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
    
  `
  );

export const autoAcceptWorkspaceInvites = (to, workspaceName) =>
  sendEmail(
    to,
    'Welcome to Diff workspaces',
    `
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
    `
  );

export const inviteNewUserToWorkspace = (to, workspaceName, invitedBy) =>
  sendEmail(
    to,
    'Welcome to Diff workspaces',
    `
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
    `
  );
