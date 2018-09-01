const _ = require("lodash");
const userManager = require("../helpers/userManager");

exports.authenticate = (req, res) => {
  // check the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith("basic")
  ) {
    return userManager.basicAuthentication(req, res);
  } else if (
    !req.headers.authorization &&
    req.body.indexOf("grant_type=refresh_token") !== -1
  ) {
    return userManager.tokenAuthentication(req, res);
  }
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send(400, {
      err: "Email / password required to create an account"
    });
  }
  try {
    const token = await userManager.signupUser(email, password);
    res.send(200, token);
  } catch (err) {
    res.send(400, { err: err.message });
  }
};

exports.verifyUser = async (req, res) => {
  const { email } = req.query;
  if (_.isNil(email)) {
    return res.send(404, "");
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

exports.inviteUsersToWorkspace = async (req, res) => {
  const { emails, workspaceId } = req.body;
  const { authorization } = req.headers;

  try {
    const creatorUid = await userManager.bearerToUid(authorization);
    if (!creatorUid) {
      return res.send(401, { message: "Cannot invite user anonymously" });
    }
    await userManager.inviteUsers(emails, workspaceId, creatorUid);
    res.send(200, {
      status: "invited"
    });
  } catch (err) {
    res.send(400, { message: "not invited" });
  }
};

exports.createWorkspace = async (req, res) => {
  const { name } = req.body;
  const { authorization } = req.headers;

  try {
    const creatorUid = await userManager.bearerToUid(authorization);
    if (!creatorUid) {
      return res.send(401, { message: "Cannot create workspace anonymously" });
    }
    await userManager.createWorkspace(name, creatorUid);
    res.send(200, {
      status: "workspace created"
    });
  } catch (err) {
    res.send(400, { message: "Workspace not created: " + err.message });
  }
};

exports.getDomains = async (req, res) => {
  const refreshToken = req.swagger.params.token.value;
  if (!refreshToken) {
    res.json({
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
