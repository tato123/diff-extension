const crypto = require("crypto");
const querystring = require("querystring");
const admin = require("firebase-admin");
const db = admin.firestore();
const firebase = require("firebase");
const emailNotify = require("./email");
const _ = require("lodash");
const workspaceHelper = require("./workspace");

/**
 * Placeholder for adding additional claims
 * needed for this particular user. These should be
 * static claims that we want to ensure that a user
 * needs to refetch
 * @param {*} uid
 */
const retrieveClaimsForUid = async uid => {
  const claims = {};

  return claims;
};

const createAndStoreRefreshToken = async uid => {
  const token = `${crypto.randomBytes(15).toString("hex")}`;
  await db
    .collection("refreshToken")
    .doc(uid)
    .set({
      uid,
      token,
      created: admin.firestore.FieldValue.serverTimestamp()
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

const autoAcceptWorkspaceInvites = async (email, uid) => {
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
      emailNotify.autoAcceptWorkspaceInvites(invite.email, workspace.name);
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
    .then(uid => autoAcceptWorkspaceInvites(email, uid))
    .then(uid => createTokenForUid(uid, offlineScope));
};

const isUser = async email => {
  const querySnapshot = await db
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  return !querySnapshot.empty;
};

const bearerToUid = async authorizationBearer => {
  if (
    !_.isNil(authorizationBearer) &&
    authorizationBearer.toLowerCase().startsWith("bearer")
  ) {
    const idToken = authorizationBearer.split(" ")[1];
    return admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => decodedToken.uid);
  }

  return null;
};

const inviteUsers = async (emails, workspaceId, creatorUid) => {
  const workspaceDoc = await db
    .collection("workspace")
    .doc(workspaceId)
    .get();

  if (!workspaceDoc.exists) {
    throw new Error("workspace does not exist");
  }

  const workspaceRecord = workspaceDoc.data();

  return Promise.all(
    emails.map(async email => {
      // check if we already have an invite for this user and workspace id
      const inviteEmailToWorkspaceRef = await db
        .collection("invites")
        .where("email", "==", email)
        .where("workspaceId", "==", workspaceId)
        .get();

      if (!inviteEmailToWorkspaceRef.empty) {
        console.log(
          `[Already invited to workspace] ${creatorUid} - Attempted to invite user [${email}] to ${workspaceId}`
        );
        return;
      }

      // check if we have a user for this email
      const userQuerySnapshot = await db
        .collection("users")
        .where("email", "==", email)
        .limit(1)
        .get();
      const userExists = !userQuerySnapshot.empty;

      // create a new invite for this user
      const invite = {
        email: email,
        workspaceId,
        created: admin.firestore.FieldValue.serverTimestamp(),
        status: userExists ? "accept.review" : "pending",
        invitedBy: creatorUid
      };

      await db
        .collection("invites")
        .doc()
        .set(invite);

      if (userExists) {
        userQuerySnapshot.forEach(async userDoc => {
          const user = await userDoc.data();
          // this is a secondary check that should be more rare, however
          // if we no longer have an invite record, at minimum check the workspace to
          // see if the user is part of it
          if (_.has(workspaceRecord.users, user.uid)) {
            console.log(
              `[Already in workspace] ${creatorUid} - Attempted to invite user [${email}] to ${workspaceId}`
            );
            return;
          }

          workspaceRecord.users[user.uid] = {
            role: "collaborator",
            created: admin.firestore.FieldValue.serverTimestamp()
          };
          await workspaceDoc.ref.update(workspaceRecord);

          // upgrade all of the events
          await workspaceHelper.updateEventsForWorkspaceId(
            workspaceDoc.id,
            userDoc.id
          );

          // 2. add the workspace to the user account
          await updateUserWorkspace(userDoc.id, workspaceDoc.id);

          // add to workspace if its an existing user and notify them that they've been added
          console.log(
            `[Existing user invited] ${creatorUid} - Added [${email}] to ${workspaceId}`
          );

          return emailNotify.autoAcceptWorkspaceInvites(
            email,
            workspaceRecord.name
          );
        });
      } else {
        // this is a brand new user, send the appropriate email
        console.log(
          `[New user invited] ${creatorUid} - Added [${email}] to ${workspaceId}`
        );

        return emailNotify.inviteNewUserToWorkspace(
          email,
          workspaceRecord.name
        );
      }
    })
  );
};

const updateUserWorkspace = async (uid, workspaceId) => {
  if (_.isNil(uid) || _.isNil(workspaceId)) {
    throw new Error("uid or workspaceid cannot be null");
  }

  const doc = await db
    .collection("users")
    .doc(uid)
    .get();
  const userRecord = doc.data();

  userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
    [workspaceId]: true
  });

  return doc.ref.update(userRecord);
};

const createWorkspace = async (name, userId) => {
  const userDoc = await db
    .collection("users")
    .doc(userId)
    .get();

  if (!userDoc.exists) {
    return Promise.reject(new Error(`User ${userId} does not exist`));
  }
  const user = userDoc.data();

  console.log(`Creating a new workspace ${name}`);
  // 1. create the workspace
  const workspaceDocRef = db.collection("workspace").doc();
  const workspace = {
    users: {
      [userId]: {
        role: "creator",
        created: admin.firestore.FieldValue.serverTimestamp()
      }
    },
    name
  };
  await workspaceDocRef.set(workspace);

  // 2. add the workspace to the user account
  await updateUserWorkspace(userId, workspaceDocRef.id);

  // 2. Upgrade the user
  const upgradedEvents = await workspaceHelper.updateEventsForWorkspaceId(
    workspaceDocRef.id,
    userId
  );
  console.log(`Updated ${upgradedEvents} for ${userId} and workspace ${name}`);

  // 3. send email that we have created a new workspace
  return emailNotify.createWorkspace(user.email, name);
};

const getDomains = async refreshToken => {
  const snapshot = await db
    .collection("refreshToken")
    .where("token", "==", refreshToken)
    .get();

  const { uid } = snapshot.docs[0].data();

  const workspaceSnapshot = await db
    .collection("workspace")
    .where(`users.${uid}.role`, ">", "")
    .get();

  const ids = [{ type: "uid", val: uid }];
  workspaceSnapshot.forEach(doc =>
    ids.push({ type: "workspace", val: doc.id })
  );

  const eventsRef = db.collection("events");
  const sitesQueries = await Promise.all(
    _.chain(ids)
      .map(({ type, val }) => {
        return eventsRef
          .where(type === "uid" ? `meta.userId` : "meta.workspaceId", "==", val)
          .get();
      })
      .value()
  );

  const sites = _.chain(sitesQueries)
    .flatMap(querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => docs.push(doc));
      return docs;
    })
    .map(doc => {
      const data = doc.data();
      return data.url.href;
    })
    .uniq()
    .value();

  return sites;
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
  isUser,
  bearerToUid,
  inviteUsers,
  createWorkspace,
  getDomains
};
