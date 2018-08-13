// const express = require("express");
// const router = express.Router();
const crypto = require("crypto");
const querystring = require("querystring");
const admin = require("firebase-admin");
const db = admin.firestore();
const firebase = require("firebase");
const _ = require("lodash");

const retrieveClaimsForUid = async uid => {
  const db = admin.firestore();

  const querySnapshot = await db
    .collection("workspace")
    .where(`users.${uid}`, "==", true)
    .get();
  const workspaces = {};
  querySnapshot.forEach(doc => {
    Object.assign(workspaces, {
      workspaces: {
        ...workspaces.workspaces,
        [doc.id]: true
      }
    });
  });

  return workspaces;
};

const createAndStoreRefreshToken = async uid => {
  const token = `${crypto.randomBytes(15).toString("hex")}`;
  await db
    .collection("refreshToken")
    .doc(uid)
    .set({
      uid,
      token
    });

  return token;
};

const createTokenForUid = async (uid, offlineScope = false) => {
  const claims = await retrieveClaimsForUid(uid);

  const access_token = await admin.auth().createCustomToken(uid, claims);

  const customToken = {
    access_token
  };

  if (offlineScope) {
    const refresh_token = await createAndStoreRefreshToken(uid);
    Object.assign(customToken, { refresh_token });
  }

  return customToken;
};

const restoreTokenForUid = async (uid, refresh_token) => {
  const customToken = await createTokenForUid(uid);
  return Object.assign({}, customToken, { refresh_token });
};

const basicAuthentication = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("Basic Token", token);
  const buf = new Buffer(token, "base64");
  const [username, password] = buf.toString().split(":");
  const offlineScope = true;
  console.log("Attempting to perform basic authentication", username);
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then(credential => {
      console.log("User signed in", username);
      const { user } = credential;
      return createTokenForUid(user.uid, offlineScope);
    })
    .then(function(customToken) {
      res.send(200, customToken);
    })
    .catch(error => {
      res.send(401, { err: error.message });
    });
};

const tokenAuthentication = async (req, res) => {
  try {
    // As an admin, the app has access to read and write all data, regardless of Security Rules
    const token = querystring.parse(req.body).refresh_token;

    const snapshot = await db
      .collection("refreshToken")
      .where("token", "==", token)
      .limit(1)
      .get();

    if (snapshot.docs.length > 0) {
      const { uid } = snapshot.docs[0].data();
      const customToken = await restoreTokenForUid(uid, token);
      return res.send(200, customToken);
    } else {
      return res.send(401, { err: "Invalid refresh token" });
    }
  } catch (error) {
    return res.send(401, { err: error.message });
  }
};

/**
 * Creates a new account for a user
 * @param {*} uid
 */
const initializeAccount = async uid => {
  // create an account
  const accountRef = await db.collection("accounts").add({
    plan: "trial",
    createdBy: uid,
    created: Date.now(),
    users: {
      [uid]: {
        role: "owner"
      }
    },
    billing: {
      stripeToken: "xxxx-x"
    }
  });

  await db
    .collection("users")
    .doc(uid)
    .update({
      accounts: {
        [accountRef.id]: true
      }
    });
};

const initializeUser = async user => {
  return db
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: null,
      photoUrl: null,
      uid: user.uid,
      email: user.email,
      verified: false
    });
};

// ----------------------------------------------------------------
// Define our api routes
// ----------------------------------------------------------------

exports.authenticate = (req, res) => {
  // check the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith("basic")
  ) {
    return basicAuthentication(req, res);
  } else if (
    !req.headers.authorization &&
    req.body.indexOf("grant_type=refresh_token") !== -1
  ) {
    return tokenAuthentication(req, res);
  }
};

exports.signup = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(400, {
      err: "Email / password required to create an account"
    });
  }

  const offlineScope = true;
  admin
    .auth()
    .createUser({
      email,
      password
    })
    .then(credential => initializeUser(credential).then(() => credential.uid))
    .then(uid => initializeAccount(uid).then(() => uid))
    .then(uid => createTokenForUid(uid, offlineScope))
    .then(token => {
      res.send(200, token);
    })
    .catch(err => {
      res.send(400, { err: err.message });
    });
};

exports.health = (req, res) => {
  res.send(200, "running");
};

// router.get("/test", (req, res) => {
//   const test = require("./test");
//   const records = test(req.query.accountId, req.query.userId);

//   const batch = db.batch();

//   records.forEach(record => {
//     const dbRef = db.collection("events").doc();
//     batch.set(dbRef, record);
//   });

//   batch
//     .commit()
//     .then(() => res.send(201))
//     .catch(() => res.send(400));
// });

// module.exports = router;

exports.acceptInvite = async (req, res) => {
  if (!req.params.inviteId) {
    return res.send(400, "<h1>Uh oh, that invite id isn't valid</h1>");
  }

  // perform operations

  const inviteSnapshot = await db
    .collection("invites")
    .doc(req.params.inviteId)
    .get();

  const invite = inviteSnapshot.data();

  const workspaceSnapshot = await db
    .collection("workspace")
    .doc(invite.workspaceId)
    .get();

  // add our user to the workspace
  const workspace = workspaceSnapshot.data();

  res.send(500, "not accepted");
};

exports.verifyUser = async (req, res) => {
  if (_.isNil(req.query.email)) {
    return res.send(404, "");
  }

  try {
    const querySnapshot = await db
      .collection("users")
      .where("email", "==", req.query.email)
      .limit(1)
      .get();

    if (!querySnapshot.empty) {
      return res.send(200, "");
    }
    return res.send(404, "");
  } catch (err) {
    res.send(404);
  }
};
