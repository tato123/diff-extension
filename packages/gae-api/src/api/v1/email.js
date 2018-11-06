import mailer, { mailgun } from '../../email';
import logging from '../../logging';

function sendTemplateToList(template, list) {
  logging.debug(`Sending email for Template ${template}`);
  logging.debug(`Sending email to List ${list}`);

  const mgList = mailgun.lists(list);

  return new Promise((resolve, reject) => {
    mgList.members().list((err, members) => {
      if (err) {
        return reject(err);
      }

      Promise.all(
        members.items.map(({ address }) => {
          logging.debug(`sending an email to ${address}`);
          return mailer[template]({ to: address });
        })
      )
        .then(resolve)
        .catch(reject);
    });
  });
}

function sendTemplateToEmail(template, email) {
  logging.debug(`Sending email for Template ${template}`);
  logging.debug(`Sending email to email ${email}`);

  return mailer[template]({ to: email });
}

export const sendTemplate = async (req, res) => {
  const { list, email } = req.query;
  const { name: template } = req.params;

  try {
    if (list) {
      await sendTemplateToList(template, list);
    }

    if (email) {
      await sendTemplateToEmail(template, email);
    }
    return res.send(201);
  } catch (error) {
    return res.send(404, error.message);
  }

  return res.status(404);
};

// ignoring eslint error for now with this statement
export const hello = () => {};
