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
    logging.info(`Registering a new user${  user.sub}`);
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
 *
 */
export const inviteUsers = async (
  emails: Array<String>,
  workspaceId: String,
  creatorUid: String
): Promise<Array<String>> => {
  const workspaceDoc = await db
    .collection('workspace')
    .doc(workspaceId)
    .get();

  if (!workspaceDoc.exists) {
    throw new Error('workspace does not exist');
  }

  const workspaceRecord = workspaceDoc.data();

  return Promise.all(
    emails.map(async email => {
      // check if we already have an invite for this user and workspace id
      const inviteEmailToWorkspaceRef = await db
        .collection('invites')
        .where('email', '==', email)
        .where('workspaceId', '==', workspaceId)
        .get();

      if (!inviteEmailToWorkspaceRef.empty) {
        logging.info(
          `[Already invited to workspace] ${creatorUid} - Attempted to invite user [${email}] to ${workspaceId}`
        );
        return;
      }

      // check if we have a user for this email
      const userQuerySnapshot = await db
        .collection('users')
        .where('email', '==', email)
        .limit(1)
        .get();
      const userExists = !userQuerySnapshot.empty;

      // create a new invite for this user
      const invite = {
        email,
        workspaceId,
        created: admin.firestore.FieldValue.serverTimestamp(),
        status: userExists ? 'accept.review' : 'pending',
        invitedBy: creatorUid
      };

      await db
        .collection('invites')
        .doc()
        .set(invite);

      if (userExists) {
        userQuerySnapshot.forEach(async userDoc => {
          const user = await userDoc.data();
          // this is a secondary check that should be more rare, however
          // if we no longer have an invite record, at minimum check the workspace to
          // see if the user is part of it
          if (_.has(workspaceRecord.users, user.uid)) {
            logging.info(
              `[Already in workspace] ${creatorUid} - Attempted to invite user [${email}] to ${workspaceId}`
            );
            return;
          }

          workspaceRecord.users[user.uid] = {
            role: 'collaborator',
            created: admin.firestore.FieldValue.serverTimestamp()
          };
          await workspaceDoc.ref.update(workspaceRecord);

          // upgrade all of the events
          await workspaceHelper.updateEventsForWorkspaceId(
            workspaceDoc.id,
            userDoc.id
          );

          // 2. add the workspace to the user account
          await UserModel.updateUserWorkspace(userDoc.id, workspaceDoc.id);

          // add to workspace if its an existing user and notify them that they've been added
          logging.info(
            `[Existing user invited] ${creatorUid} - Added [${email}] to ${workspaceId}`
          );

          return emailNotify.autoAcceptWorkspaceInvites(
            email,
            workspaceRecord.name
          );
        });
      } else {
        // this is a brand new user, send the appropriate email
        logging.info(
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

export const updateUserWorkspace = async (uid: string, workspaceId: string) => {
  if (_.isNil(uid) || _.isNil(workspaceId)) {
    throw new Error('uid or workspaceid cannot be null');
  }

  const doc = await db
    .collection('users')
    .doc(uid)
    .get();
  const userRecord = doc.data();

  userRecord.workspaces = Object.assign({}, userRecord.workspaces, {
    [workspaceId]: true
  });

  return doc.ref.update(userRecord);
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
  await UserModel.updateUserWorkspace(uid, workspaceDocRef.id);

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
