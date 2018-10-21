import _ from 'lodash';
import Mailgun from 'mailgun-js';
import { models, auth as firestoreAuth } from '../../firestore';
import logging from '../../logging';
import mailer from '../../email';
import host from '../../host';

/**
 * Sends an invitation to an email address
 * enabling someone to opt into a workspace
 *
 * @param {*} req
 * @param {*} res
 */
export const inviteToWorkspace = async (req, res) => {
  const { id: workspaceId } = req.params;
  const { email, firstName, lastName } = req.body;
  const { authorization } = req.headers;

  try {
    const creatorUid = await firestoreAuth.bearerToUid(authorization);
    if (!creatorUid) {
      return res.send(401, { message: 'Cannot invite user anonymously' });
    }
    await models.users.inviteEmailToWorkspace(
      email,
      firstName,
      lastName,
      workspaceId,
      creatorUid
    );
    res.send(200, {
      status: 'invited'
    });
  } catch (error) {
    res.send(400, { message: 'not invited', error: error.message });
  }
};

export const createWorkspace = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  try {
    const creatorUid = await models.users.bearerToUid(authorization);
    if (!creatorUid) {
      return res.send(401, { message: 'Cannot create workspace anonymously' });
    }
    const workspaceId = await models.users.createWorkspace(name, creatorUid);
    res.send(200, {
      workspaceId
    });
  } catch (err) {
    res.send(400, { message: `Workspace not created: ${err.message}` });
  }
};

export const acceptInvite = async (req, res) => {
  const { nonce, id } = req.params;

  // redirect user to the appropriate oops page
  if (!nonce || !id) {
    return res.send(400, 'Nonce and id required');
  }

  console.log('Nonce is', nonce);
  console.log('Workspace id', id);
  const page = `${host.getWebHost()}/app/invite`;

  try {
    // update
    const success = await models.invites.acceptInvite(nonce);

    if (success) {
      return res.redirect(301, page);
    }
    const message = `Unable to accept invite ${nonce}`;
    return res.redirect(301, `page?error=${encodeURIComponent(message)}`);
  } catch (error) {
    res.redirect(301, `${page}?error=${encodeURIComponent(error.message)}`);
  }
};
