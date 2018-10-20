import _ from 'lodash';
import * as emailNotify from '../email/email';
import workspaceHelper from './workspace';
import { admin, db } from './index';
import logging from '../logging';

export interface User {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  locale: string;
  updated_at: string;
  iss: string;
  sub: string;
}

export interface UserToken {
  id_token: String;
  access_token: String;
}

/**
 * For a given email and user id, will automatically accept
 * all of the associated invites
 */
export const acceptInvite = async (user: User) => {
  const querySnapshot = await db
    .collection('invites')
    .where('email', '==', email)
    .where('status', '==', 'pending')
    .get();

  // we have pending invites
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async inviteDoc => {
      // 1. get our invite
      const invite = inviteDoc.data();
      const workspaceId = invite.workspaceId;

      // 2. get our workspace
      const workspaceDoc = await db
        .collection('workspace')
        .doc(workspaceId)
        .get();
      const workspace = workspaceDoc.data();

      // 3. add our user to the workspace
      workspace.users[uid] = true;
      workspaceDoc.ref.update(workspace);

      // 4. Change our invite status
      invite.status = 'accept.review';
      inviteDoc.ref.update(invite);

      // 5. send an email
      emailNotify.autoAcceptWorkspaceInvites(invite.email, workspace.name);
    });
  }
  return uid;
};

/**
 * Handles registering a new user
 *
 * @param {User} user - a new user object
 * @returns {Promise<boolean | void>}
 */
export const registerUser = async (user: User): Promise<boolean | void> => {
  try {
    logging.info(`Registering a new user${user.sub}`);
    await db
      .collection('users')
      .doc(user.sub)
      .set(user);
    return true;
  } catch (error) {
    logging.error(error);
    return false;
  }
};

/**
 * Invites a parti
 */
export const inviteEmailToWorkspace = async (
  email: string,
  firstName: string | undefined,
  lastName: string | undefined,
  workspaceId: string,
  creatorUid: string
): Promise<void> => {
  const workspaceRef = await db.collection('workspace').doc(workspaceId);
  const invitesRef = await db.collection('invites').doc();

  console.log(
    'Creating an invite for',
    firstName,
    lastName,
    email,
    'from',
    creatorUid,
    'workspace',
    workspaceId
  );

  const workspaceDoc = await workspaceRef.get();

  if (!workspaceDoc.exists) {
    throw new Error('workspace does not exist');
  }

  const workspace = workspaceDoc.data();

  await invitesRef.set({
    email,
    workspaceId,
    firstName,
    lastName,
    created: admin.firestore.FieldValue.serverTimestamp(),
    status: 'pending',
    invitedBy: creatorUid
  });

  await workspaceRef.update({
    invites: {
      ...(workspace.invites || {}),
      [invitesRef.id]: true
    }
  });

  const userDoc = await db
    .collection('users')
    .doc(creatorUid)
    .get();

  const user = userDoc.data();
  return emailNotify.inviteNewUserToWorkspace(
    email,
    workspace.name,
    user.given_name
  );
};

export const updateUserWorkspace = async (uid: string, workspaceId: string) => {
  if (_.isNil(uid) || _.isNil(workspaceId)) {
    throw new Error('uid or workspaceid cannot be null');
  }

  const doc = await db
    .collection('users')
    .doc(uid)
    .get();

  if (doc.exists) {
    const userRecord = doc.data();
    if (userRecord) {
      userRecord.workspaces = {
        ...userRecord.workspaces,
        [workspaceId]: true
      };
      return doc.ref.update(userRecord);
    }
  }

  return Promise.resolve();
};

export const createWorkspace = async (
  name: string,
  uid: string
): Promise<string> => {
  const userDoc = await db
    .collection('users')
    .doc(uid)
    .get();

  if (!userDoc.exists) {
    return Promise.reject(new Error(`User ${uid} does not exist`));
  }
  const user = userDoc.data();

  logging.info(`Creating a new workspace ${name}`);
  // 1. create the workspace
  const workspaceDocRef = db.collection('workspace').doc();
  const workspace = {
    users: {
      [uid]: {
        role: 'creator',
        created: admin.firestore.FieldValue.serverTimestamp()
      }
    },
    name
  };
  await workspaceDocRef.set(workspace);

  // 2. add the workspace to the user account
  await updateUserWorkspace(uid, workspaceDocRef.id);

  // 2. Upgrade the user
  const upgradedEvents = await workspaceHelper.updateEventsForWorkspaceId(
    workspaceDocRef.id,
    uid
  );
  logging.info(`Updated ${upgradedEvents} for ${uid} and workspace ${name}`);

  // 3. send email that we have created a new workspace
  await emailNotify.createWorkspace(user.email, name);

  return workspaceDocRef.id;
};

export const getDomains = async (
  refreshToken: string
): Promise<Array<string>> => {
  const snapshot = await db
    .collection('refreshToken')
    .where('token', '==', refreshToken)
    .get();

  const { uid } = snapshot.docs[0].data();

  const workspaceSnapshot = await db
    .collection('workspace')
    .where(`users.${uid}.role`, '>', '')
    .get();

  const ids = [{ type: 'uid', val: uid }];
  workspaceSnapshot.forEach(doc =>
    ids.push({ type: 'workspace', val: doc.id })
  );

  const eventsRef = db.collection('events');
  const sitesQueries = await Promise.all(
    _.chain(ids)
      .map(({ type, val }) =>
        eventsRef
          .where(type === 'uid' ? `meta.userId` : 'meta.workspaceId', '==', val)
          .get()
      )
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
      return data.url.hostname;
    })
    .uniq()
    .value();

  return sites;
};

export const bearerToUid = async (
  authorizationBearer: string
): Promise<string | null> => {
  if (
    !_.isNil(authorizationBearer) &&
    authorizationBearer.toLowerCase().startsWith('bearer')
  ) {
    const idToken = authorizationBearer.split(' ')[1];
    return admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => decodedToken.uid);
  }

  return null;
};
