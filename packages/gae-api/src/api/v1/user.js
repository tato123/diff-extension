import { models } from '../../firestore';

/**
 * Retrieves all of the available domains for a given logged in user
 *
 * @param {*} req
 * @param {*} res
 */
export const getDomains = async (req, res) => {
  try {
    const {
      params: { uid }
    } = req;

    if (!uid) {
      res.send(404, 'UID required');
    }

    const domains = await models.users.getDomains(uid);
    res.json({
      domains
    });
  } catch (err) {
    res.json({
      message: err.message
    });
  }
};

/**
 * Provides a mechanism for users to signup for the early
 * access / beta mailing list
 *
 * @todo: change this to just signup for email lists
 *
 * @param {*} req
 * @param {*} res
 */
export const emailListSignup = async (req, res) => {
  const { list, feature } = req.query;
  const { firstname, lastname, email } = req.body;

  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;

  const mailgun = new Mailgun({ apiKey, domain });
  const maillist = mailgun.lists('early-access@mail.getdiff.app');

  const subscriber = {
    subscribed: true,
    address: email,
    name: `${firstname} ${lastname}`,
    vars: {
      feature,
      list
    }
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
