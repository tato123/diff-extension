import firestoreClient from '../client';
import * as firestoreUsers from './users';
import * as firestoreWorkspace from './workspace';
import * as firestoreEvents from './events';
import * as emailNotify from '../../email/email';
import emailer from '../../email';
import hosts from '../../host';

const { admin, db } = firestoreClient;

export interface Invite {
  created: FirebaseFirestore.FieldValue;
  email: string;
  firstName: string;
  lastName: string;
  invitedBy: string;
  lastPing: FirebaseFirestore.FieldValue;
  status: string;
  workspaceId: string;
}

/**
 * For a given email and user id, will automatically accept
 * all of the associated invites
 */
export const acceptInvite = async (inviteId: string): Promise<boolean> => {
  const inviteDoc = await db
    .collection('invites')
    .doc(inviteId)
    .get();

  if (!inviteDoc.exists) {
    throw new Error('Invalid invite id');
  }

  const invite = inviteDoc.data() as Invite;

  const user = await firestoreUsers.userForEmail(invite.email);

  if (user) {
    await firestoreWorkspace.addUserToWorkspace(invite.workspaceId, user.sub);

    await firestoreEvents.setWorkspaceForEventsByUid(
      invite.workspaceId,
      user.sub
    );

    // 4. Change our invite status
    invite.status = 'accept.review';
    inviteDoc.ref.update(invite);
  } else {
    throw new Error(`Could not find a user for email ${invite.email}`);
  }

  return true;
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

  // 1. check if we have an existing workspace for this id,
  // if we dont then we can't do anything with this request
  const workspaceDoc = await workspaceRef.get();

  if (!workspaceDoc.exists) {
    throw new Error('workspace does not exist');
  }

  // get our references
  const workspace = workspaceDoc.data();
  const existingInviteRef = await db
    .collection('invites')
    .where('workspaceId', '==', workspaceId)
    .get();
  const invitesRef = await db.collection('invites').doc();

  const makeNonce = (host: string): string =>
    `${host}/workspace/${workspaceId}/invite/${invitesRef.id}/accept`;

  const nonce =
    process.env.NODE_ENV === 'production'
      ? makeNonce(process.env.API_ADDRESS as string)
      : makeNonce(hosts.getWebHost());

  if (!existingInviteRef.empty) {
    // we've already got an invite, just add this to history and ignore
    console.warn(
      'already invited this user, you must really want them to join, tell them to check their email',
      email
    );

    // new invite
    existingInviteRef.forEach(
      async querySnapshot =>
        await querySnapshot.ref.update({
          lastPing: admin.firestore.FieldValue.serverTimestamp()
        })
    );

    return emailer.inviteEmail({
      to: email,
      workspace: workspace.name,
      nonce
    });
  }
  // new invite
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
  return emailer.inviteEmail({
    to: email,
    workspace: workspace.name,
    nonce
  });
};
