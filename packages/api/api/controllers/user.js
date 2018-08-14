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
