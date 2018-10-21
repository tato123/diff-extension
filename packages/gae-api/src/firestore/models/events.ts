import _ from 'lodash';
import firestoreClient from '../client';
import * as firestoreWorkspace from './workspace';
import * as firestoreUsers from './users';

const { admin, db } = firestoreClient;

export interface Event {
  meta: {
    [extraProps: string]: any;
    created: FirebaseFirestore.FieldValue;
    workspaceId: string;
    userId: string;
  };
  url: {
    [extraProps: string]: any;
    hostname: string;
    href: string;
  };
  type: string;
  selector: string;
  attachments: [any];
}

/**
 * Updates event records to match a given
 * workspace id
 *
 * @param workspaceId
 * @param uid
 */
export const setWorkspaceForEventsByUid = async (
  workspaceId: string,
  uid: string
): Promise<number> => {
  if (_.isNil(uid) && _.isNil(workspaceId)) {
    return Promise.reject(new Error('Invalid user record'));
  }

  const user = await firestoreUsers.getUserForUid(uid);

  if (!user) {
    throw new Error(`No user for uid ${uid}`);
  }

  if (!firestoreWorkspace.hasUser(uid, workspaceId)) {
    throw new Error(`UID ${uid} is not a member of ${workspaceId}`);
  }

  // 3. upgrade all events for this user where there is
  // no workspaceid (saved against just userid account)
  const eventsQuerySnapshot = await db
    .collection('events')
    .where('meta.userId', '==', uid)
    .get();

  let upgradedEvents = 0;
  eventsQuerySnapshot.forEach(async doc => {
    const event = doc.data();
    if (!event.meta.workspaceId) {
      upgradedEvents++;
      event.meta.workspaceId = workspaceId;
      await doc.ref.update(event);
    }
  });

  return upgradedEvents;
};
