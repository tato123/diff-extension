import _ from 'lodash';
import { WriteResult } from '@google-cloud/firestore';
import * as emailNotify from '../../email/email';
import emailer from '../../email';
import * as firestoreWorkspace from '../workspace';
import firestoreClient from '../client';
import logging from '../../logging';

const db = firestoreClient.db;

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
  workspaces: {
    [id: string]: boolean;
  };
}

export interface UserToken {
  id_token: String;
  access_token: String;
}

export const userForEmail = async (
  email: string
): Promise<User | undefined> => {
  const querySnapshot = await db
    .collection('users')
    .where('email', '==', email)
    .get();

  if (querySnapshot.empty) {
    return Promise.reject(null);
  }

  let user;
  querySnapshot.forEach(userDoc => (user = userDoc.data()));
  return user;
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

export const getDomains = async (uid: string): Promise<Array<string>> => {
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

export const getUserForUid = async (uid: string): Promise<User | null> => {
  // 1. check if this user exists
  const userDocRef = await db
    .collection('users')
    .doc(uid)
    .get();

  if (!userDocRef.exists) {
    return null;
  }

  return userDocRef.data() as User;
};
