// emails
const Mailgun = require("mailgun-js");

const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

// configure mailgun
//Your api key, from Mailgun’s Control Panel
var api_key = "3bfbefa8dbdac9dd7833bf079e7e16ac-a5d1a068-8506b9b8";

//Your domain, from the Mailgun Control Panel
var domain = "mail.getdiff.app";

//Your sending email address
var from_who = "no-reply@getdiff.app";

const sendEmail = (to, name) => {
  //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  const mailgun = new Mailgun({ apiKey: api_key, domain: domain });

  const data = {
    //Specify email data
    from: from_who,
    //The email to contact
    to,
    //Subject and text data
    subject: "Welcome to Diff workspaces",
    html: `
      <h1>[Test Email]</h1>

      <h3>Welcome to Diff Workspaces!</h3>

      <p>You've just created your first workspace, "${name}"</p>
    `
  };

  return new Promise((resolve, reject) => {
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, (err, body) => {
      //If there is an error, render the error page
      if (err) {
        console.log("got an error: ", err);
        reject(new Error("got an error: ", err));
      }
      //Else we can greet    and leave
      else {
        //Here "submitted.jade" is the view file for this landing page
        //We pass the variable "email" from the url parameter in an object rendered by Jade
        console.log(body);
        resolve(body);
      }
    });
  });
};

exports.upgradeEventsOnWorkspaceCreate = functions.firestore
  .document("workspace/{workspaceId}")
  .onCreate((snap, context) => {
    const newValue = snap.data();

    if (newValue && !newValue.users && !newValue.name) {
      return Promise.reject(new Error("Invalid user record"));
    }

    console.log();
    const users = Object.keys(newValue.users);
    console.log("Check and upgrade users", users);

    // upgrade events for users added to workspace that dont
    // have a workspace id associated with them
    return Promise.all(
      users.map(userId => {
        const db = admin.firestore();
        // get my user account
        return db
          .collection("users")
          .doc(userId)
          .get()
          .then(userSnapshot => {
            const user = userSnapshot.data();

            if (!user.email) {
              console.error("email not found", user);
              throw new Error("email not found", user);
            }
            return user;
          })
          .then(user =>
            Promise.all([
              db
                .collection("events")
                .where("meta.userId", "==", userId)
                .get(),
              user
            ])
          )
          .then(([querySnapshot, user]) => {
            let upgradeCount = 0;
            const promises = [];
            querySnapshot.forEach(doc => {
              const data = doc.data();

              if (!data.meta.workspaceId) {
                const record = Object.assign({}, data, {
                  meta: {
                    workspaceId: context.params.workspaceId
                  }
                });
                upgradeCount++;
                promises.push(doc.ref.set(record, { merge: true }));
                console.log("Update", record);
              }
            });

            console.log("Workspace name", newValue);
            return Promise.all([
              ...promises,
              sendEmail(user.email, newValue.name)
            ]);
          });
      })
    );
  });
