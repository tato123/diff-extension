import _ from 'lodash';
import firestoreClient from '../client';
import { User } from './users';
import logging from '../../logging';
import * as firestoreEvents from './events';
import * as emailNotify from '../../email/email';
import emailer from '../../email';

const { admin, db } = firestoreClient;

export interface Workspace {
  invites: {
    [key: string]: boolean;
  };
  name: string;
  users: {
    [key: string]: {
      created: FirebaseFirestore.FieldValue;
      role: string;
      status: string;
    };
  };
}

export const addUserToWorkspace = async (
  workspaceId: string,
  uid: string,
  role: string = 'collaborator'
): Promise<Workspace> => {
  const workspaceDoc = await db
    .collection('workspace')
    .doc(workspaceId)
    .get();

  if (!workspaceDoc.exists) {
    throw new Error(`Workspace id not found ${workspaceId}`);
  }

  const workspace = workspaceDoc.data() as Workspace;

  const newWorkspace = _.merge(workspace, {
    users: {
      [uid]: {
        created: admin.firestore.FieldValue.serverTimestamp(),
        role
      }
    }
  });

  await workspaceDoc.ref.update(newWorkspace);
  await updateUserWorkspace(uid, workspaceDoc.id);

  return newWorkspace;
};

/**
 * As the title suggests, this creates a
 * brand new workspace.
 *
 * @param name
 * @param uid
 */
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
  const upgradedEvents = await firestoreEvents.setWorkspaceForEventsByUid(
    workspaceDocRef.id,
    uid
  );
  logging.info(`Updated ${upgradedEvents} for ${uid} and workspace ${name}`);

  // 3. send email that we have created a new workspace
  await emailNotify.createWorkspace(user.email, name);

  return workspaceDocRef.id;
};

/**
 * Updates a user record by adding a workspaces entry / mapping.
 * THis is duplicated data intended to make it easier to determine
 * all of the workspaces a given user belongs to
 *
 * @param uid
 * @param workspaceId
 */
export const updateUserWorkspace = async (uid: string, workspaceId: string) => {
  if (_.isNil(uid) || _.isNil(workspaceId)) {
    throw new Error('uid or workspaceid cannot be null');
  }

  const doc = await db
    .collection('users')
    .doc(uid)
    .get();

  if (doc.exists) {
    const user = doc.data();
    if (user) {
      const newRecord = _.merge(user, {
        workspaces: {
          [workspaceId]: true
        }
      });

      return doc.ref.update(newRecord);
    }
  }

  return Promise.resolve();
};

export const hasUser = async (
  uid: string,
  workspaceId: string
): Promise<boolean> => {
  // 2. Verify that user belongs to workspace
  const workspaceDocRef = await db
    .collection('workspace')
    .doc(workspaceId)
    .get();

  if (!workspaceDocRef.exists) {
    return Promise.reject(new Error(`Workspace ${workspaceId} not found`));
  }

  const workspace = workspaceDocRef.data() as Workspace;
  return _.has(workspace.users, uid);
};
