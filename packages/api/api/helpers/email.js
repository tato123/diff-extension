const Mailgun = require("mailgun-js");

// Mailgun configuration
const apiKey = "3bfbefa8dbdac9dd7833bf079e7e16ac-a5d1a068-8506b9b8";
const domain = "mail.getdiff.app";
const from = "no-reply@getdiff.app";

const sendEmail = (to, template) => {
  // We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  const mailgun = new Mailgun({ apiKey: apiKey, domain: domain });

  const data = {
    from,
    to,
    subject: "Welcome to Diff workspaces",
    html: template
  };

  return new Promise((resolve, reject) => {
    // Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, (err, body) => {
      // If there is an error, render the error page
      if (err) {
        console.log("got an error: ", err);
        reject(new Error("got an error: ", err));
      }
      // Else we can greet    and leave
      else {
        // Here "submitted.jade" is the view file for this landing page
        // We pass the variable "email" from the url parameter in an object rendered by Jade
        console.log(body);
        resolve(body);
      }
    });
  });
};

exports.acceptInviteToWorkspace = (to, workspaceName) => {
  return sendEmail(
    to,
    `
      <h1>[Test Email]</h1>
  
      <h3>Diff - Accepted workspace invite to ${workspaceName}!</h3>
  
      <p>Congrats on joining ${workspaceName}</p>
    `
  );
};
