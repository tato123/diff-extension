import transporter from './transporter';

const defaultFrom = 'Diff <diff-noreply@getdiff.app>';

const signupEmail = ({ from = defaultFrom, to, name }) => {
  const mail = {
    from,
    to,
    subject: 'Beta Signup',
    template: 'earlySignup',
    context: {
      title: `You're signed up for the early beta, ${name}`
    }
  };
  return transporter.sendMail(mail);
};

const welcomeEmail = ({ from = defaultFrom, to }) => {
  const mail = {
    from,
    to,
    subject: 'Welcome',
    template: 'welcome'
  };
  return transporter.sendMail(mail);
};

const inviteEmail = ({ from = defaultFrom, to, workspace, nonce }) => {
  const mail = {
    from,
    to,
    subject: 'Workspace',
    template: 'inviteToWorkspace',
    context: {
      nonce,
      workspace
    }
  };
  return transporter.sendMail(mail);
};

const betaDownload = ({ from = defaultFrom, to }) => {
  const mail = {
    from,
    to,
    subject: 'Welcome to the Diff Beta',
    template: 'betaDownload'
  };
  return transporter.sendMail(mail);
};

export default {
  signupEmail,
  welcomeEmail,
  inviteEmail,
  betaDownload
};
