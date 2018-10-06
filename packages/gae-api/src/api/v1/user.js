import _ from 'lodash';
import Mailgun from 'mailgun-js';
import userManager from '../helpers/userManager';
import logging from '../../logging';
import mailer from '../../email';

export const authenticate = (req, res) => {
  // check the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith('basic')
  ) {
    return userManager.basicAuthentication(req, res);
  }
  if (
    !req.headers.authorization &&
    req.body.indexOf('grant_type=refresh_token') !== -1
  ) {
    return userManager.tokenAuthentication(req, res);
  }
};

export const signup = async (req, res) => {
  const { email, password, displayName } = req.body;
  if (!email || !password) {
    return res.send(400, {
      err: 'Email / password required to create an account'
    });
  }
  try {
    const token = await userManager.signupUser(email, password, displayName);
    res.send(200, token);
  } catch (err) {
    res.send(400, { err: err.message });
  }
};

export const verifyUser = async (req, res) => {
  const { email } = req.query;
  if (_.isNil(email)) {
    return res.send(404, '');
  }

  try {
    const isValid = await userManager.isUser(email);
    if (isValid) {
      return res.send(200);
    }
    return res.send(404);
  } catch (err) {
    res.send(404);
  }
};

export const inviteUsersToWorkspace = async (req, res) => {
  const { emails, workspaceId } = req.body;
  const { authorization } = req.headers;

  try {
    const creatorUid = await userManager.bearerToUid(authorization);
    if (!creatorUid) {
      return res.send(401, { message: 'Cannot invite user anonymously' });
    }
    await userManager.inviteUsers(emails, workspaceId, creatorUid);
    res.send(200, {
      status: 'invited'
    });
  } catch (err) {
    res.send(400, { message: 'not invited' });
  }
};

export const createWorkspace = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  try {
    const creatorUid = await userManager.bearerToUid(authorization);
    if (!creatorUid) {
      return res.send(401, { message: 'Cannot create workspace anonymously' });
    }
    const workspaceId = await userManager.createWorkspace(name, creatorUid);
    res.send(200, {
      workspaceId
    });
  } catch (err) {
    res.send(400, { message: `Workspace not created: ${err.message}` });
  }
};

export const getDomains = async (req, res) => {
  const refreshToken = req.params.token.value;
  if (!refreshToken) {
    return res.json({
      domains: []
    });
  }

  try {
    const domains = await userManager.getDomains(refreshToken);
    res.json({
      domains
    });
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

export const emailListSignup = (req, res) => {
  const { list } = req.query;
  const { firstname, lastname, email } = req.body;

  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;

  const mailgun = new Mailgun({ apiKey, domain });
  const maillist = mailgun.lists('early-access@mail.getdiff.app');

  const subscriber = {
    subscribed: true,
    address: email,
    name: `${firstname} ${lastname}`,
    vars: {}
  };
  maillist
    .members()
    .create(subscriber)
    .then(data => {
      logging.debug(data);
      return mailer.signupEmail({ to: email, name: firstname });
    })
    .then(() => res.sendStatus(201))
    .catch(err => {
      logging.error(err.message);
      res.send(400, err.message);
    });
};
