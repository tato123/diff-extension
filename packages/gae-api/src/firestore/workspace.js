import _ from 'lodash';
import { db } from ".";

const updateEventsForWorkspaceId = async (workspaceId, userId) => {
  if (_.isNil(userId) && _.isNil(workspaceId)) {
    return Promise.reject(new Error('Invalid user record'));
  }

  // 1. check if this user exists
  const userDocRef = await db
    .collection('users')
    .doc(userId)
    .get();

  if (!userDocRef.exists) {
    return Promise.reject(new Error(`User ${userId} not found`));
  }

  // 2. Verify that user belongs to workspace
  const workspaceDocRef = await db
    .collection('workspace')
    .doc(workspaceId)
    .get();

  if (!workspaceDocRef.exists) {
    return Promise.reject(new Error(`Workspace ${workspaceId} not found`));
  }

  const workspace = workspaceDocRef.data();
  if (!_.has(workspace.users, userId)) {
    return Promise.reject(
      new Error(`User ${userId} is not associated with ${workspaceId}`)
    );
  }

  // 3. upgrade all events for this user where there is
  // no workspaceid (saved against just userid account)
  const eventsQuerySnapshot = await db
    .collection('events')
    .where('meta.userId', '==', userId)
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

export default {
  updateEventsForWorkspaceId
};
