const crypto = require("crypto");
const querystring = require("querystring");
const admin = require("firebase-admin");
const db = admin.firestore();
const firebase = require("firebase");
const emailNotify = require("./email");

const retrieveClaimsForUid = async uid => {
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
      token,
      created: Date.now()
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

/**
 * Creates a basic user record`
 * @param {String} user
 * @returns {Promise}
 */
const initializeUser = user => {
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

const basicAuthentication = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log("Basic Token", token);
  const buf = Buffer.from(token, "base64");
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

const acceptWorkspaceInvites = async (email, uid) => {
  const querySnapshot = await db
    .collection("invites")
    .where("email", "==", email)
    .where("status", "==", "pending")
    .get();

  // we have pending invites
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async inviteDoc => {
      // 1. get our invite
      const invite = inviteDoc.data();
      const workspaceId = invite.workspaceId;

      // 2. get our workspace
      const workspaceDoc = await db
        .collection("workspace")
        .doc(workspaceId)
        .get();
      const workspace = workspaceDoc.data();

      // 3. add our user to the workspace
      workspace.users[uid] = true;
      workspaceDoc.ref.update(workspace);

      // 4. Change our invite status
      invite.status = "accept.review";
      inviteDoc.ref.update(invite);

      // 5. send an email
      emailNotify.acceptInviteToWorkspace(invite.email, workspace.name);
    });
  }
  return uid;
};

const signupUser = (email, password) => {
  const offlineScope = true;
  return admin
    .auth()
    .createUser({
      email,
      password
    })
    .then(credential => initializeUser(credential).then(() => credential.uid))
    .then(uid => acceptWorkspaceInvites(email, uid))
    .then(uid => createTokenForUid(uid, offlineScope));
};

const isUser = async email => {
  const querySnapshot = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (!querySnapshot.empty) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("empty user"));
};

module.exports = {
  retrieveClaimsForUid,
  createAndStoreRefreshToken,
  createTokenForUid,
  restoreTokenForUid,
  basicAuthentication,
  tokenAuthentication,
  initializeUser,
  signupUser,
  isUser
};
